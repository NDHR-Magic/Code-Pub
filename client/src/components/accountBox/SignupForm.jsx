import React, { useContext, useRef, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
import { register } from "../../actions/userActions";

function SignupForm(props) {
  const dispatch = useDispatch();
  const { switchToSignin } = useContext(AccountContext);
  const first_nameRef = useRef('');
  const last_nameRef = useRef('');
  const usernameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const confirmRef = useRef('');

  const redirect = props.location.searc ? props.location.search.split("=")[1] : "/";

  const userRegister = useSelector(state => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (passwordRef.current.value === confirmRef.current.value) {
      dispatch(register(first_nameRef.current.value, last_nameRef.current.value, usernameRef.current.value, emailRef.current.value, passwordRef.current.value));
    } else {
      alert("passwords dont match");
    }
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [props.history, redirect, userInfo]);

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

export default withRouter(SignupForm);