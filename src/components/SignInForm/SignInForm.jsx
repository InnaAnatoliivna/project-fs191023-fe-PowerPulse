import { ErrorMessage, Form, Formik } from 'formik'
import Button from '../Button/Button'
// import { useDispatch } from 'react-redux'
import { Grid } from '@mui/material'
import { validationSchemaRegister } from '../../utils/validateSchemes'
import { TextFields } from './SignInForm.styled'

const SignInForm = () => {
    // const dispatch = useDispatch();

    const initialValues = {
        email: '',
        password: '',
    };

    const handleSubmit = (values, { resetForm }) => {
        // dispatch(signinUser(values));
        resetForm();
    };

    return (
        <div>        <div>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchemaRegister}
                onSubmit={handleSubmit}
            >
                {props => (
                    <Form>
                        <Grid
                            container
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                        >
                            <TextFields

                                type="email"
                                id="email"
                                name="email"
                                variant="outlined"
                                label="Email"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                            />
                            <TextFields
                                type="password"
                                id="password"
                                name="password"
                                variant="outlined"
                                label="Password"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                            />
                        </Grid>
                        <Button primary={true}>Sign Up</Button>
                    </Form>
                )}
            </Formik>
        </div></div>
    )
}

export default SignInForm