import React, { useContext } from "react";
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

  return (

    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full Name" />
        <Input type="text" placeholder="Username" />
        <Input type="number" name="birth_day" size="2" maxLength="2" placeholder="Birth Day" />
        <Input type="number" name="birth_month" size="2" maxLength="2" placeholder="Birth Month" />
        <Input type="number" name="birth_year" size="2" maxLength="4" placeholder="Birth Year" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="password" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit">Sign-Up</SubmitButton>
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
