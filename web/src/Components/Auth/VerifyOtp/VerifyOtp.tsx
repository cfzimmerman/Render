/* eslint-disable @typescript-eslint/no-unused-vars */

// TODO: refactor signin to use this component
import React, { useState } from 'react';
import { TextInput } from '../../Common/TextInput/TextInput';
import styles from './VerifyOtp.module.css';

interface Props {
  username: string;
  processOtp: (otp: string) => void;
}

export const VerifyOtp: React.FC<Props> = (props) => {
  const { username, processOtp } = props;

  const [otp, setOtp] = useState('');
  const [otpDisabled, setOtpDisabled] = useState(false);
  const [otpError, setOtpError] = useState(false);

  return (
    <div className={styles.verifyOtp}>
      <div className={styles.verifyOtpContent}>
        <h1>Welcome back, {username}!</h1>
        <h4>Please type the code sent to your email.</h4>
        <TextInput
          disabled={otpDisabled}
          value={otp}
          error={otpError}
          placeholder="XXX-XXX"
          onChange={(val) => processOtp(val)}
        />
        {/* <button type="submit" onClick={() => verifyOtp()}>
            Verify OTP
          </button> */}
      </div>
    </div>
  );
};
