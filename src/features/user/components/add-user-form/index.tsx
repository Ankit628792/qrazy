import Joi from 'joi'
import {
  Button,
  Container,
  EmailInput,
  Form,
  FormInput,
  FormProvider,
  FormSection,
  PasswordInput
} from '@/components'

const addNewUserSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required',
      'string.email': 'Please enter a valid email'
    }),
  age: Joi.number().required().messages({
    'number.base': 'Age is required'
  }),
  address: Joi.string().required().messages({
    'string.empty': 'Address is required'
  })
})

export const AddUserForm = () => {
  const handleSubmit = (data: any) => {
    console.log(data)
  }
  return (
    <Container className="w-[40vw]">
      <FormProvider schema={addNewUserSchema} onSubmit={handleSubmit}>
        <Form>
          <FormSection label="" className="">
            <FormInput name="name" label="Name">
              <EmailInput />
            </FormInput>
            <FormInput name="email" label="Email">
              <EmailInput />
            </FormInput>
            <FormInput name="age" label="Age">
              <EmailInput />
            </FormInput>
            <FormInput name="address" label="Address">
              <EmailInput />
            </FormInput>
            <Button
              type="submit"
              btnText="Add User"
              btnType="base"
              className="w-[200px] m-2"
            />
          </FormSection>
        </Form>
      </FormProvider>
    </Container>
  )
}
