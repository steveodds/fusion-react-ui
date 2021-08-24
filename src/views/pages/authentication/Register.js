import { Fragment, useState, useContext } from 'react'
import { isObjEmpty } from '@utils'
import classnames from 'classnames'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { handleLogin } from '@store/actions/auth'
import { Link, useHistory } from 'react-router-dom'
import { AbilityContext } from '@src/utility/context/Can'
import InputPasswordToggle from '@components/input-password-toggle'
import { Facebook, Twitter, Mail, GitHub } from 'react-feather'
import { Row, Col, CardTitle, CardText, FormGroup, Label, Button, Form, Input, CustomInput } from 'reactstrap'
import { registerService } from '../../../fusionapis/register.service'

import '@styles/base/pages/page-auth.scss'

const Register = () => {
  const ability = useContext(AbilityContext)

  const [skin, setSkin] = useSkin()

  const history = useHistory()

  const dispatch = useDispatch()

  const { register, errors, handleSubmit, trigger } = useForm()

  const [email, setEmail] = useState('')
  const [valErrors, setValErrors] = useState({})
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [orgid, setOrgID] = useState('')
  const [terms, setTerms] = useState(false)

  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const Terms = () => {
    return (
      <Fragment>
        I agree to
        <a className='ml-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Fragment>
    )
  }

  const onSubmit = () => {
    if (isObjEmpty(errors)) {
      // useJwt
      //   .register({ username, email, password })
      //   .then(res => {
      //     if (res.data.error) {
      //       const arr = {}
      //       for (const property in res.data.error) {
      //         if (res.data.error[property] !== null) arr[property] = res.data.error[property]
      //       }
      //       setValErrors(arr)
      //       if (res.data.error.email !== null) console.error(res.data.error.email)
      //       if (res.data.error.username !== null) console.error(res.data.error.username)
      //     } else {
      //       setValErrors({})
      //       const data = { ...res.data.user, accessToken: res.data.accessToken }
      //       ability.update(res.data.user.ability)
      //       dispatch(handleLogin(data))
      //       history.push('/')
      //     }
      //   })
      //   .catch(err => console.log(err))
      registerService.userRegistration(firstname, lastname, email, password, orgid)
      .then( function (response) {
          if (!response.result) {
            toast.error('Could not register. Please try again.', {
              position: "top-right",
              autoClose: false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined
            })
          } else {
            setValErrors({})
            history.push('') //TODO Redirect to email confirmation page
          }
        }
      )

    }
  }

  const handleFirstnameChange = e => {
    const errs = valErrors
    if (errs.username) delete errs.username
    setFirstname(e.target.value)
    setValErrors(errs)
  }

  const handleLastnameChange = e => {
    const errs = valErrors
    if (errs.username) delete errs.username
    setLastname(e.target.value)
    setValErrors(errs)
  }

  const handleOrgIDChange = e => {
    const errs = valErrors
    if (errs.username) delete errs.username
    setOrgID(e.target.value)
    setValErrors(errs)
  }

  const handleEmailChange = e => {
    const errs = valErrors
    if (errs.email) delete errs.email
    setEmail(e.target.value)
    setValErrors(errs)
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <h2 className='brand-text text-primary ml-1'>Infosight Technologies</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              FusionAI
            </CardTitle>
            <CardText className='mb-2'>Register your account</CardText>

            <Form action='/' className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  First Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={username}
                  placeholder='John'
                  id='register-username'
                  name='register-username'
                  onChange={handleFirstnameChange}
                  className={classnames({ 'is-invalid': errors['register-username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.username ? (
                  <small className='text-danger'>{valErrors.username}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Last Name
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={username}
                  placeholder='Doe'
                  id='register-lastname'
                  name='register-lastname'
                  onChange={handleLastnameChange}
                  className={classnames({ 'is-invalid': errors['register-username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.username ? (
                  <small className='text-danger'>{valErrors.username}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input
                  type='email'
                  value={email}
                  id='register-email'
                  name='register-email'
                  onChange={handleEmailChange}
                  placeholder='john.doe@example.com'
                  className={classnames({ 'is-invalid': errors['register-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
                {Object.keys(valErrors).length && valErrors.email ? (
                  <small className='text-danger'>{valErrors.email}</small>
                ) : null}
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle
                  value={password}
                  id='register-password'
                  name='register-password'
                  className='input-group-merge'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['register-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Organization ID
                </Label>
                <Input
                  autoFocus
                  type='text'
                  value={orgid}
                  placeholder='100'
                  id='register-username'
                  name='register-username'
                  onChange={handleOrgIDChange}
                  className={classnames({ 'is-invalid': errors['register-username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type='checkbox'
                  id='terms'
                  name='terms'
                  value='terms'
                  label={<Terms />}
                  className='custom-control-Primary'
                  innerRef={register({ required: true })}
                  onChange={e => setTerms(e.target.checked)}
                  invalid={errors.terms && true}
                />
              </FormGroup>
              <Button.Ripple type='submit' block color='primary'>
                Sign up
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Already have an account?</span>
              <Link to='/login'>
                <span>Sign in instead</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register
