import React, { useContext, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
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
import Loading from "../LoadingScreen";
import MessageBox from "../MessageBox";

function LoginForm(props) {
  const dispatch = useDispatch();
  const { switchToSignup } = useContext(AccountContext);
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const redirect = props.location.search ? props.location.search.split("=")[1] : "/";

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo, error, loading } = userSignin;

  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(emailRef.current.value);
    dispatch(signin(emailRef.current.value, passwordRef.current.value));

    emailRef.current.value = "";
    passwordRef.current.value = "";
  }

  return (
    <div>
      {loading && <Loading />}
      {error && <MessageBox variant="danger">{error}</MessageBox>}
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
    </div>
  );
}

export default withRouter(LoginForm);