/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-17 12:07:43
 * @Description: 一级目录表单
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-17 12:39:29
 */

import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class FormMainCatalogue extends Component {
  componentDidMount() {
    const { validateFields } = this.props.form
    validateFields()
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }

  render() {
    const {
      form, mode, label, onDelete
    } = this.props
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
      setFieldsValue
    } = form
    const nameError = isFieldTouched('name') && getFieldError('name')

    return (
      <Form
        layout='inline'
        onSubmit={this.handleSubmit}
      >

        <FormItem
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('name')(
            <Input
              size='small'
              prefix={<Icon type='folder' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='一级目录名称'
            />
          )}
        </FormItem>

        <FormItem>
          <Button
            type='primary'
            htmlType='submit'
            size='small'
          >
            提交
          </Button>
        </FormItem>

      </Form>
    )
  }
}

const WrappedFormMainCatalogue = Form.create()(FormMainCatalogue)

export default WrappedFormMainCatalogue
