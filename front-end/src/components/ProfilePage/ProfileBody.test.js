import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import { ProfileBody } from './ProfileBody';

jest.mock('axios');
jest.mock('axios');
global.localStorage = {
  getItem: jest.fn(() => 'dummyToken'),
  removeItem: jest.fn(),
};

describe('ProfileBody', () => {
  test('displays user profile correctly', async () => {
    const mockProfile = {
      user: [
        {
          _id: '64c871d1bbd9b2b2928d570d',
          username: 'Manjesh',
          email: 'Manjesh@gmail.com',
          password: '$2a$10$4yOoP6XmnlodWon8yN7yo.TvlbwrFMGLHo.AYWuH6egmpNseieTb6',
          confirmPassword: '$2a$10$2KVlVVwihxfUcrzSKC7PG.wuFGIQcyR86Wrqplj9j.WvdYxufxnPm',
          image: 'IMG-1690904313060.jpg',
          watchlist: ['736769', '460032', '346698', '24827'],
          totalMoviesReviewed: 0,
          __v: 4,
          isUserLoggedIn: true,
        },
      ],
    };
    axios.get.mockResolvedValue({ data: mockProfile });

    render(
      // Wrap your component with MemoryRouter
      <MemoryRouter>
        <ProfileBody />
      </MemoryRouter>
    );

    await waitFor(() => {
      const usernameElement = screen.getByText('Manjesh');
      const emailElement = screen.getByText('Manjesh@gmail.com');
      const profileImage = screen.getByAltText('user-profile-image');

      expect(usernameElement).toBeInTheDocument();
      expect(emailElement).toBeInTheDocument();
      expect(profileImage).toBeInTheDocument();
      expect(profileImage.src).toContain('IMG-1690904313060.jpg');
    });
  });

});

