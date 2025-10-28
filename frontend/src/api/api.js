import axios from 'axios';

// Use environment variable for API URL or determine based on environment
const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // In production/Docker (nginx), use /api proxy
  // In development, use http://localhost:8000
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }
  return '/api'; // Use nginx proxy when deployed
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin API
export const adminAPI = {
  uploadPlayers: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  resetAuction: () => api.post('/admin/reset'),
  getAllPlayers: () => api.get('/admin/players'),
};

// Teams API
export const teamsAPI = {
  getTeams: () => api.get('/teams'),
  getTeam: (teamId) => api.get(`/teams/${teamId}`),
  updateTeam: (teamId, data) => api.put(`/teams/${teamId}`, data),
  createTeam: (data) => api.post('/teams', data),
  deleteTeam: (teamId) => api.delete(`/teams/${teamId}`),
};

// Auction API
export const auctionAPI = {
  getNextPlayer: () => api.get('/auction/next-player'),
  sellPlayer: (data) => api.post('/auction/sell-player', data),
  undoLastAction: () => api.post('/auction/undo'),
};

// Download API
export const downloadAPI = {
  getTeamRosters: () => api.get('/download/teams'),
  getUnsoldPlayers: () => api.get('/download/unsold'),
};

// Support API
export const supportAPI = {
  getFAQ: () => api.get('/support/faq'),
  getInstructions: () => api.get('/support/instructions'),
  getHelp: () => api.get('/support/help'),
};

export default api;
