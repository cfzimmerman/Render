import { Auth, CognitoUser } from '@aws-amplify/auth';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { v4 } from 'uuid';
import RenderIcon from '../../assets/render_icon_white.png';
import { UserContext } from '../../Context/UserContext';
import { AbsoluteButton } from '../Auth/BackButton/AbsoluteButton';
import { Button } from '../Common/Button/Button';
import { TextInput } from '../Common/TextInput/TextInput';
import styles from './SignIn.module.css';

export const SignIn: React.FC<{}> = () => {
  const { user, setUser } = useContext(UserContext);

  const titleRef = useRef<HTMLHeadingElement>(null);

  const [session, setSession] = useState<CognitoUser | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [otpDisabled, setOtpDisabled] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [titleWidth, setTitleWidth] = useState(0);
  const [signup, setSignup] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const signIn = async () => {
    // Ensure only one code is sent
    if (isSigningIn) {
      return;
    }

    try {
      setIsSigningIn(true);
      const cognitoUser: CognitoUser = await Auth.signIn({ username: email, password });
      setUser(cognitoUser);
    } catch (err) {
      setIsSigningIn(false);
      if ((err as Error).toString().includes('UserNotFoundException')) {
        // User does not exist, direct to sign up with app
        setSignup(true);
      }
    }
    setPassword('');
  };

  const verifyOtp = () => {
    Auth.sendCustomChallengeAnswer(session, otp.replace('-', ''))
      .then((newUser) => {
        setOtpError(false);
        setUser(newUser);
        setSession(null);
      })
      .catch((err) => {
        setOtpError(true);
        setOtp('');
        console.log(err); // TODO: introduce central error log func
      });
  };

  const processOtp = (val: string) => {
    if (val.length === 3 && otp.length !== 4) {
      setOtp(`${val}-`);
      return;
    }

    setOtp(val);
    if (val.length === 7) {
      setOtpDisabled(true);
      verifyOtp();
    }
  };

  const signOut = () => {
    if (user) {
      Auth.signOut();
      setUser(null);
    }
    setIsSigningIn(false);
    setSignup(false);
    setOtp('');
    setSession(null);
  };

  // TODO: Temp func, remove when render app is linked
  const signUp = async () => {
    const pass = v4();
    console.log('password: ', pass);
    const result = await Auth.signUp({
      username: email,
      password: '123456789'
    }).then(() => signOut()); // After signUp, we are going to signIn()
    return result;
  };

  useEffect(() => {
    if (!titleRef || !titleRef.current) {
      return;
    }
    setTitleWidth(titleRef.current.getBoundingClientRect().width);
  }, [titleRef]);

  return (
    <>
      {!user && !session && !signup && (
        <div>
          <img className={styles.renderLogo} src={RenderIcon} alt="Render-logo" />
          <div className={styles.signInContent}>
            <h1>Save forever, share anywhere</h1>
            {!user && !session && (
              <div className={styles.textFields}>
                <TextInput
                  value={email}
                  placeholder="Email"
                  onChange={(val) => setEmail(val)}
                  onSubmit={signIn}
                />
                <TextInput
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(val) => setPassword(val)}
                  onSubmit={signIn}
                />
              </div>
            )}
          </div>
          <AbsoluteButton text="Continue" onClick={signIn} />
        </div>
      )}
      {!user && !!session && (
        <div className={styles.verifyOtp}>
          <div className={styles.verifyOtpContent}>
            <h1>Welcome back, {session.getUsername()}</h1>
            <h4>Please type the code sent to your email.</h4>
            <TextInput
              disabled={otpDisabled}
              value={otp}
              error={otpError}
              placeholder="XXX-XXX"
              onChange={(val) => processOtp(val)}
            />
          </div>
        </div>
      )}
      {!user && !session && signup && (
        <div className={styles.verifyOtp}>
          <div className={styles.verifyOtpContent}>
            <h1 ref={titleRef}>High time you joined us</h1>
            <h4
              style={{
                width: titleWidth ? titleWidth * 0.9 : 'auto'
              }}>
              Please make an account on our iOS / Android app to continue
            </h4>
            <Button
              text="Get Render"
              classNames={[styles.getRenderButton]}
              onClick={signUp} // TODO: Link to render app
            />
          </div>
        </div>
      )}
      {((!user && !!session) || signup) && <AbsoluteButton text="Back" onClick={signOut} />}
    </>
  );
};
