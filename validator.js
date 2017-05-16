// @flow
import _ from 'lodash'

type StringValueType = string
type HashValueType = { [key: string]: string }
type ValueType = StringValueType | HashValueType

type ResultType = { message: string, name: string } | null
type ValidateType = (value: ValueType, name: string, ...validators: Function[]) => ResultType

const validate: ValidateType = (value, name, ...validators) => {
  const message = _.find(_.map(validators, v => v(value, name)))
  if (message) {
    return { message, name }
  }
  return null
}

export default validate

type ValidatorBaseType<V> = (value: V) => false | string
type ValidatorType<V> = (message: ?string) => ValidatorBaseType<V>
type ThresholdValidatorType<V> = (threshold: number, message: ?string) => ValidatorBaseType<V>

export const required: ValidatorType<StringValueType> =
  message => value => _.isEmpty(_.trim(value)) && (message || '必須です')

export const anyRequired: ValidatorType<HashValueType> =
  message => value => _.every(value, v => _.isEmpty(_.trim(v))) && (message || 'いずれか必須です')

export const number: ValidatorType<StringValueType> =
  message => value => (_.isNaN(_.toNumber(value)) || _.includes(value, '.')) && (message || '数値で入力してください')

export const gte: ThresholdValidatorType<StringValueType> =
  (threshold, message) => value => (!_.isEmpty(value) && !_.gte(value, threshold)) && (message || `${threshold}以上の数字で入力してください`)

export const lte: ThresholdValidatorType<StringValueType> =
  (threshold, message) => value => (!_.isEmpty(value) && !_.lte(value, threshold)) && (message || `${threshold}以下の数字で入力してください`)

export const zipcodeFormat: ValidatorType<StringValueType> =
  message => value => (!_.isEmpty(value) && !value.match(/^\d{3}-?\d{4}$/)) && (message || '正しく入力してください')
