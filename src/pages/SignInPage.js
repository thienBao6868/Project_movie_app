import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  Modal,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FCheckbox, FTextField } from "../components/form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().oneOf([yup.ref('password'), null]).min(10, 'Password at least 10 charecter'),
}).required();
const defaultValues = {
  email: "Tbao@gmail.com",
  password: "password",
  remember: true,
};

const SignInPage = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  
  //function onDismiss() {
  //  navigate(-1);
  //}
 
  const methods = useForm({ defaultValues, resolver: yupResolver(schema)  });
  const {
    handleSubmit,
    // setError,
    // control,
    formState: { errors, isSubmitting },
  } = methods;
  const [showPassword, setShowPassword] = useState(false);
  const onSubmit = (data) => {
    let from = location.state?.from?.pathname || "/";
    auth.signin(data.email, () => {
      
      // Send them back to the page they tried to visit when they were
      // redirected to the login page. Use { replace: true } so we don't create
      // another entry in the history stack for the login page.  This means that
      // when they get to the protected page and click the back button, they
      // won't end up back on the login page, which is also really nice for the
      // user experience.
        
      navigate(from, { replace: true });
    });
    console.log(data)
  };
  return (
    <Modal
      open={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      //onBackdropClick={() => onDismiss()}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "2rem",
        outline: "0",
      }}
    >
      <Box width={600}>
        <Paper
          elevation={8}
          style={{
            borderRadius: "10px",
          }}
        >
          <div style={{ padding: "3rem" }}>
            <Typography color="red" variant="h3" textAlign="center" mb={3}>
              Sign In NetFlix
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={3} xs={3}>
                {!!errors.afterSubmit && (
                  <Alert severity="error">{errors.afterSubmit.message}</Alert>
                )}
                <FTextField name="email" label="Email address" />
                <FTextField
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          color="danger"
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
              <Stack>
                <FCheckbox name="remember" label="Remember me" />
              </Stack>
              <Stack>
                <LoadingButton
                  size="large"
                  type="submit"
                  variant="contained"
                  color="danger"
                  loading={isSubmitting}
                >
                  Login
                </LoadingButton>
              </Stack>
            </FormProvider>
          </div>
        </Paper>
      </Box>
    </Modal>
  );
};

export default SignInPage;
