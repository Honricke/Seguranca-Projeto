import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button } from "@mui/material";
import loginBG from "../assets/loginBG.png";
import { Link } from "react-router-dom";

interface RegisterType {
  name: string;
  lastName: string;
  email: string;
  pass: string;
}

const schema = yup.object({
  name: yup.string().required("Insira seu nome"),
  lastName: yup.string().required("Insira o seu sobrenome"),
  email: yup
    .string()
    .email("Insira um email válido")
    .required("Insira seu email"),
  pass: yup
    .string()
    .required("Insira sua senha")
    .min(6, "A senha precisa ter no mínimo 6 caracteres"),
});

const Register = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<RegisterType> = (data) => console.log(data);

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
            flex: "1 1 auto",
            gridTemplateAreas: `            
            "name lastName" 
            "email email"
            "pass pass"
            "button button"
            "text text" `,
            width: "100%",
            minWidth: "280px",
            maxWidth: "450px",
            gap: "20px",
            margin: "0 auto",
            padding: "3rem",
            boxSizing: "border-box",
          }}
        >
          <Controller
            control={control}
            name="name"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <TextField
                error={errors.name ? true : false}
                helperText={errors.name?.message}
                style={{ gridArea: "name" }}
                onChange={onChange}
                value={value}
                label="Nome"
                variant="outlined"
              />
            )}
          />
          <Controller
            control={control}
            name="lastName"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <TextField
                error={errors.lastName ? true : false}
                helperText={errors.lastName?.message}
                style={{ gridArea: "lastName" }}
                onChange={onChange}
                value={value}
                label="Sobrenome"
                variant="outlined"
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            defaultValue=""
            render={({ field: { value, onChange } }) => (
              <TextField
                error={errors.email ? true : false}
                helperText={errors.email?.message}
                style={{ gridArea: "email" }}
                onChange={onChange}
                value={value}
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
                style={{ gridArea: "pass" }}
                onChange={onChange}
                value={value}
                label="Senha"
                type="password"
                variant="outlined"
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            style={{ outline: "None", gridArea: "button" }}
          >
            Register
          </Button>
          <p
            style={{
              fontSize: "0.8em",
              color: "#777",
              margin: 0,
              gridArea: "text",
            }}
          >
            Does have an account? <Link to={"/login"}>Sign In</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
