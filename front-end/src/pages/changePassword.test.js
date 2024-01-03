import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import ChangePassword from './changePassword';

jest.mock('axios');

describe('ChangePassword', () => {
  test('renders the form correctly', () => {
    render(<ChangePassword />);
    const currentPasswordInput = screen.getByPlaceholderText('Enter your current password');
    const newPasswordInput = screen.getByPlaceholderText('Enter your new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    const changePasswordButton = screen.getByText('CHANGE PASSWORD');

    expect(currentPasswordInput).toBeInTheDocument();
    expect(newPasswordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(changePasswordButton).toBeInTheDocument();
  });

  test('allows changing password when inputs are filled correctly', async () => {
    const mockResponse = { data: { message: 'Password changed successfully!' } };
    axios.put.mockResolvedValue(mockResponse);

    render(<ChangePassword />);
    const currentPasswordInput = screen.getByPlaceholderText('Enter your current password');
    const newPasswordInput = screen.getByPlaceholderText('Enter your new password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm your password');
    const changePasswordButton = screen.getByText('CHANGE PASSWORD');

    fireEvent.change(currentPasswordInput, { target: { value: 'oldPassword123' } });
    fireEvent.change(newPasswordInput, { target: { value: 'newPassword456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'newPassword456' } });

    fireEvent.click(changePasswordButton);

    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        'http://localhost:3001/users/change-password',
        {
          currentPassword: 'oldPassword123',
          newPassword: 'newPassword456',
          confirmPassword: 'newPassword456',
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      const successMessage = screen.getByText('Password changed successfully!');
      expect(successMessage).toBeInTheDocument();

      // Assert that the input fields are cleared after successful password change
      expect(currentPasswordInput.value).toBe('');
      expect(newPasswordInput.value).toBe('');
      expect(confirmPasswordInput.value).toBe('');
    });
  });
});
