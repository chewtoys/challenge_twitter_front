import { ApolloError } from '@apollo/client'
import { format } from 'date-fns'

export const formatValidationErrors = (errors: any) => {
  let newErrors: any = []
  if (errors[0].message !== 'Argument Validation Error') {
    return errors[0]
  }
  const validationErrors = errors[0].extensions.exception?.validationErrors

  validationErrors.forEach((error: any) => {
    const field = error.property
    const constraints = error.constraints
    newErrors.push({
      field,
      message: Object.values(constraints)[0],
    })
  })

  return newErrors
}

export const handleErrors = (e: any) => {
  let errors = []
  if (e instanceof ApolloError) {
    if (
      e.graphQLErrors &&
      e.graphQLErrors[0].message === 'Argument Validation Error'
    ) {
      errors.push(formatValidationErrors(e.graphQLErrors))
    } else {
      errors.push(e)
    }
  } else {
    errors.push(e)
  }
  return errors
}

export const avatarInitials = (display_name: string) => {
  const split = display_name.split(' ')
  if (split.length === 1) {
    return display_name.slice(0, 2).toUpperCase()
  } else {
    return `${split[0].slice(0, 1)}${split[1].slice(0, 1)}`.toUpperCase()
  }
}

export const formattedDate = (date: string): string => {
  return format(new Date(date), "d MMMM 'at' HH:mm")
}

export const pluralize = (count: number, str: string): string => {
  if (count > 0) {
    str += 's'
  }
  return `${count} ${str}`
}