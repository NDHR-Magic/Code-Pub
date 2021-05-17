import React, { useContext, useRef } from "react";
import { useDispatch } from "react-redux";
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
import { signin } from "../../actions/userActions";

export function LoginForm(props) {
  const dispatch = useDispatch();
  const { switchToSignup } = useContext(AccountContext);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
    dispatch(signin(emailRef.current.value, passwordRef.current.value));

    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" ref={emailRef} />
        <Input type="password" placeholder="Password" ref={passwordRef} />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton type="submit" onClick={e => submitHandler(e)}>Login</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an account?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Sign-Up
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
