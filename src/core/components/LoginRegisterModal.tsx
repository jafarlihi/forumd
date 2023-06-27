import { Modal, Button } from "@nextui-org/react"
import Form, { FORM_ERROR } from "./Form"
import { Signup } from "src/auth/schemas"
import LabeledTextField from "./LabeledTextField"
import { useState } from "react"
import { AuthenticationError } from "blitz"
import { useMutation } from "@blitzjs/rpc"
import login from "src/auth/mutations/login"
import signup from "src/auth/mutations/signup"

export default function LoginRegisterModal(props: any) {
  const [isRegisterPressed, setIsRegisterPressed] = useState(false)
  const [loginMutation] = useMutation(login)
  const [registerMutation] = useMutation(signup)

  return (
    <div>
      <Modal
        scroll
        width="400px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...props.bindings}
      >
        <Modal.Body>
          <Form
            schema={Signup}
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              setIsRegisterPressed(false)
              try {
                if (!isRegisterPressed) await loginMutation(values)
                else await registerMutation(values)
                props.setVisible(false)
              } catch (error: any) {
                if (error instanceof AuthenticationError) {
                  return { [FORM_ERROR]: "Given credentials are invalid" }
                } else {
                  return {
                    [FORM_ERROR]: "Unexpected error encountered, please try again",
                  }
                }
              }
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <LabeledTextField
                bordered
                fullWidth
                name="email"
                color="primary"
                placeholder="Email"
                label=""
              />
            </div>
            <LabeledTextField
              name="password"
              placeholder="Password"
              bordered
              fullWidth
              color="primary"
              type="password"
              label=""
            />
            <Button shadow color="primary" auto style={{ width: "100%" }} type="submit">
              Sign in
            </Button>
            <h6
              style={{
                width: "100%",
                textAlign: "center",
                borderBottom: "1px solid " + props.theme.colors.border.value,
                lineHeight: "0.1em",
                fontWeight: "normal",
                margin: "10px 0 20px",
              }}
            >
              <span
                style={{
                  background: props.theme.colors.backgroundContrast.value,
                  padding: "0 10px",
                }}
              >
                or
              </span>
            </h6>
            <Button
              shadow
              color="secondary"
              auto
              style={{ width: "100%" }}
              type="submit"
              onPress={() => setIsRegisterPressed(true)}
            >
              Sign up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  )
}
