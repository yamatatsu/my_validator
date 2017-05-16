// @flow
import _ from 'lodash'

import validate, { required, number, gte, lte } from '.validator'

const INPUT_FORM_VALIDATORS = {
  name: [required()],
  age: [required(), number(), gte(1)],
  amount: [required(), number(), gte(1), lte(300)],
}

// key: 要素のname属性, value: 要素の入力値
type TargetsType = { [key: string]: string }
type ValidateType = (targets: TargetsType) => { message: string, name: string }[]

const validateInputForm: ValidateType = targets =>
  _.compact(_.map(targets, (value, name) => {
    const validators = INPUT_FORM_VALIDATORS[name]
    return validators && validate(value, name, validators)
  }))

export default validateInputForm
