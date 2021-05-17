import React, { useContext, useRef } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);
  const first_nameRef = useRef('');
  const last_nameRef = useRef('');
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmRef = useRef('');

  const submitHandler = (e) => {
    e.preventDefault();
  }

  return (

    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="First Name" ref={first_nameRef} />
        <Input type="text" placeholder="Flast Name" ref={last_nameRef} />
        <Input type="text" placeholder="Username" ref={usernameRef} />
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />
        <Input type="password" placeholder="Confirm Password" ref={confirmRef} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit" onClick={e => submitHandler(e)}>Sign-Up</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Sign-In
        </BoldLink>
      </MutedLink>
    </BoxContainer>

  );
}
