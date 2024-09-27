import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import loginBG from "../assets/loginBG.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";

interface FormType {
  email: string;
  pass: string;
}

const schema = yup.object({
  email: yup
    .string()
    .required("Insira seu email")
    .email("Insira um email válido"),
  pass: yup
    .string()
    .required("Insira sua senha")
    .min(6, "A senha deve ter pelo menos 6 dígitos"),
});

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<FormType> = (data) => console.log(data);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          // width: "60%",
          height: "100vh",
          backgroundImage: `url(${loginBG})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          flex: "1 10 60%",
        }}
      ></div>
      <div style={{ display: "flex", alignItems: "center", flex: "1 1 auto" }}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "grid",
            width: "100%",
            minWidth: "280px",
            maxWidth: "450px",
            gap: "20px",
            margin: "0 auto",
            padding: "3rem",
            boxSizing: "border-box",
            flexGrow: 1,
          }}
        >
          <h2 style={{ color: "#434343", marginTop: 0 }}>Login</h2>
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <TextField
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                value={value}
                onChange={onChange}
                label="Email"
                variant="outlined"
              />
            )}
          />
          <Controller
            control={control}
            name="pass"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <TextField
                error={errors.pass ? true : false}
                helperText={errors.pass?.message}
                value={value}
                onChange={onChange}
                label="Password"
                variant="outlined"
                type="password"
              />
            )}
          />
          <Button type="submit" variant="contained" style={{ outline: "None" }}>
            Login
          </Button>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "20px",
            }}
          >
            <a style={{ fontSize: "0.8em" }} href="">
              Forgot Password?
            </a>
            <p style={{ fontSize: "0.8em", color: "#777", margin: 0 }}>
              Don't have an account? <Link to={"/register"}>Sign Up</Link>
            </p>
          </div>
          {errors.root && <p>{errors.root?.message}</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
