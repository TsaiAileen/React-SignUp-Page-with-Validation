import { useState, useEffect } from 'react';
import PasswordStrength from './password/PasswordStrength';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';


function SignUp() {
    
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
  };

  // For Password
  const [pwdInput, initValue] = useState({
    password: "",
  });
  const [isError, setError] = useState(null);
  const onChange = (e) => {
    let password = e.target.value;
    initValue({
      ...pwdInput,
      password: e.target.value,
    });
    setError(null);
    let caps, small, num, specialSymbol;
    if (password.length < 8) {
      setError(
        "Password should contain minimum 8 characters, with at least one UPPERCASE, lowercase, number and special character: @$! % * ? &"
      );
      return;

    } else {
      caps = (password.match(/[A-Z]/g) || []).length;
      small = (password.match(/[a-z]/g) || []).length;
      num = (password.match(/[0-9]/g) || []).length;
      specialSymbol = (password.match(/\W/g) || []).length;

      if (caps < 1) {
        setError("Must add one UPPERCASE letter");
        return;
      } else if (small < 1) {
        setError("Must add one lowercase letter");
        return;
      } else if (num < 1) {
        setError("Must add one number");
        return;
      } else if (specialSymbol < 1) {
        setError("Must add one special symbol: @$! % * ? &");
        return;
      }
    }
  }

  const [isStrong, initRobustPassword] = useState(null);
  const initPwdInput = async (childData) => {
    initRobustPassword(childData);
  };
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      e.persist();
    } catch (error) {
      throw error;
    }
  };

  // For confirm password
  const [state, setState] = useState({
    email: "",
    password: "",
    cPassword: ""
  });

  const [passMatch, setPassMatch] = useState(true);
  

  useEffect(() => {
    validatePassword();
  }, [state]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const validatePassword = () => {
    pwdInput.password === state.cPassword
      ? setPassMatch(true)
      : setPassMatch(false);
  };
  
  const createAccount = () =>{
    console.log("createAccount");
    validatePassword();  
  }

    return (
      <div>
        <Container noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="px-4">
                <Card.Body>
                  <div className="mb-3 mt-md-4">
                    <h2 className="fw-bold mb-2 text-center text-uppercase ">
                      CareerAI
                    </h2>
                    <div className="mb-3">
                      <Form onSubmit={onSubmit}>
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">
                            Email
                          </Form.Label>
                          <Form.Control
                            required
                            type="email"
                            placeholder="Enter Email"/>
                          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label>Password</Form.Label>
                          {isError !== null && <p className="errors"> - {isError}</p>}
                          <Form.Control
                            required
                            type="password"
                            onChange={onChange}
                            placeholder="Enter Password" />
                          <PasswordStrength password={pwdInput.password} actions={initPwdInput} />
                          {isStrong === "strong" && <button type="submit"> Register </button>}
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control
                            required
                            className={`form-control ${passMatch ? "" : "input-error-border"}`}
                            id="cPassword"
                            value={state.cPassword}
                            onChange={handleChange}
                            aria-required="true"
                            aria-invalid={passMatch ? true : false}
                            type="password"
                            placeholder="Enter Password"/>
                        <div className="input-error">
                          {pwdInput.password !== state.cPassword ? "" : ""}
                        </div>
                          <div className="input-error" style={{ color: "red" }}>
                          {passMatch ? "" : "Error: Passwords do not match"}
                        </div>
                        </Form.Group>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicCheckbox">
                        </Form.Group>
                        <Form.Group className="mb-3">
                        <Form.Check
                          required
                          label="Agree to terms and conditions"
                          feedback="You must agree before submitting."
                          feedbackType="invalid" />
                        </Form.Group>
                        <div className="d-grid">
                          <Button variant="primary" type="submit">
                            Create Account
                          </Button>
                        </div>
                      </Form>
                      <div className="mt-3">
                        <p className="mb-0  text-center">
                          Already have an account?{' '}
                          <a href="{''}" className="text-primary fw-bold">
                            Login In
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }

export default SignUp;