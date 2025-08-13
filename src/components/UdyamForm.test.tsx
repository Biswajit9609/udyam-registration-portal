import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UdyamForm from './UdyamForm'; 

describe('UdyamForm Component', () => {

  test('renders Step 1 on initial load', () => {
    render(<UdyamForm />);
    expect(screen.getByText(/Aadhaar Verification With OTP/i)).toBeInTheDocument();
  });

  test('shows an error message for an incomplete Aadhaar number', () => {
    render(<UdyamForm />);
    const aadhaarInput = screen.getByPlaceholderText(/Your Aadhaar No/i);

    fireEvent.change(aadhaarInput, { target: { value: '12345' } });

    expect(screen.getByText(/must be at least 12 characters/i)).toBeInTheDocument();
  });

  test('progresses to Step 2 after successful OTP validation', async () => {
    render(<UdyamForm />);

    const aadhaarInput = screen.getByPlaceholderText(/Your Aadhaar No/i);
    const nameInput = screen.getByPlaceholderText(/Name as per Aadhaar/i);
    const consentCheckbox = screen.getByLabelText(/I, the holder of the above Aadhaar/i);
    
    const generateOtpButton = screen.getByRole('button', { name: /Validate & Generate OTP/i });

    fireEvent.change(aadhaarInput, { target: { value: '123456789012' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.click(consentCheckbox);

    fireEvent.click(generateOtpButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/OTP code/i)).toBeInTheDocument();
    });

    const otpInput = screen.getByPlaceholderText(/OTP code/i);
    const validateOtpButton = screen.getByRole('button', { name: /Validate OTP/i });

    fireEvent.change(otpInput, { target: { value: '123456' } });
    fireEvent.click(validateOtpButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Enter Pan Number/i)).toBeInTheDocument();
    });
  });
});