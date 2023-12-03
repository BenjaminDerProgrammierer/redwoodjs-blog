import {
  CreateContactMutation,
  CreateContactMutationVariables,
} from 'types/graphql'

import {
  FieldError,
  Form,
  Label,
  TextField,
  TextAreaField,
  Submit,
  SubmitHandler,
  FormValues,
  useForm,
  FormError,
} from '@redwoodjs/forms'
import { MetaTags, useMutation } from '@redwoodjs/web'
import { Toaster, toast } from '@redwoodjs/web/toast'

const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`

const ContactPage = () => {
  const formMethods = useForm<FormValues>()
  const [create, { loading, error }] = useMutation<
    CreateContactMutation,
    CreateContactMutationVariables
  >(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thank you for your message!')
      formMethods.reset()
    },
  })

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data)
    create({ variables: { input: data } })
  }
  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <Form onSubmit={onSubmit} formMethods={formMethods} error={error}>
        <FormError error={error} wrapperClassName="form-error" />

        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          E-Mail
        </Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,

          }}
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Your message
        </Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Submit message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
