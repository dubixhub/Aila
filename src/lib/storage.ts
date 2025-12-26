// Local storage keys
const USERS_KEY = 'aila_users';
const CURRENT_USER_KEY = 'aila_current_user';
const CONTACTS_KEY = 'aila_contacts';
const CONTACT_MESSAGES_KEY = 'aila_contact_messages';

// Types
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
  isAdmin?: boolean;
}

export interface EmergencyContact {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

// Admin credentials
const ADMIN_EMAIL = 'admin@aila.com';
const ADMIN_PASSWORD = 'Aila@123';

// Initialize admin user
const initializeAdmin = () => {
  const users = getUsers();
  const adminExists = users.some(u => u.email === ADMIN_EMAIL);
  
  if (!adminExists) {
    const adminUser: User = {
      id: 'admin-001',
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      name: 'Admin',
      createdAt: new Date().toISOString(),
      isAdmin: true,
    };
    users.push(adminUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }
};

// User functions
export const getUsers = (): User[] => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const registerUser = (email: string, password: string, name: string): { success: boolean; message: string; user?: User } => {
  initializeAdmin();
  const users = getUsers();
  
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: 'Email already registered' };
  }
  
  const newUser: User = {
    id: `user-${Date.now()}`,
    email: email.toLowerCase(),
    password,
    name,
    createdAt: new Date().toISOString(),
    isAdmin: false,
  };
  
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  return { success: true, message: 'Registration successful', user: newUser };
};

export const loginUser = (email: string, password: string): { success: boolean; message: string; user?: User } => {
  initializeAdmin();
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password' };
  }
  
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  return { success: true, message: 'Login successful', user };
};

export const getCurrentUser = (): User | null => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const deleteUser = (userId: string) => {
  const users = getUsers().filter(u => u.id !== userId);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  
  // Also delete user's contacts
  const contacts = getContacts().filter(c => c.userId !== userId);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
};

// Emergency contacts functions
export const getContacts = (): EmergencyContact[] => {
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getUserContacts = (userId: string): EmergencyContact[] => {
  return getContacts().filter(c => c.userId === userId);
};

export const addContact = (userId: string, name: string, email: string, phone: string): EmergencyContact => {
  const contacts = getContacts();
  const newContact: EmergencyContact = {
    id: `contact-${Date.now()}`,
    userId,
    name,
    email,
    phone,
  };
  
  contacts.push(newContact);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  
  return newContact;
};

export const updateContact = (contactId: string, name: string, email: string, phone: string): boolean => {
  const contacts = getContacts();
  const index = contacts.findIndex(c => c.id === contactId);
  
  if (index === -1) return false;
  
  contacts[index] = { ...contacts[index], name, email, phone };
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  
  return true;
};

export const deleteContact = (contactId: string): boolean => {
  const contacts = getContacts().filter(c => c.id !== contactId);
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
  return true;
};

// Contact messages functions
export const getContactMessages = (): ContactMessage[] => {
  const data = localStorage.getItem(CONTACT_MESSAGES_KEY);
  return data ? JSON.parse(data) : [];
};

export const addContactMessage = (name: string, email: string, message: string): ContactMessage => {
  const messages = getContactMessages();
  const newMessage: ContactMessage = {
    id: `msg-${Date.now()}`,
    name,
    email,
    message,
    createdAt: new Date().toISOString(),
  };
  
  messages.push(newMessage);
  localStorage.setItem(CONTACT_MESSAGES_KEY, JSON.stringify(messages));
  
  return newMessage;
};

// Initialize on load
initializeAdmin();
