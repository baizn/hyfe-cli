import React, { Component } from 'react'
import { Form, Icon, Input, Button, Popconfirm } from 'antd'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class FormCatalogue extends Component {
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

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10 }
    }

    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 10, offset: 4 }
    }

    return (
      <Form onSubmit={this.handleSubmit}>

        {/* 只有当处于编辑模式时, 才会显示和提交 id */}
        {(function() {
          if (mode === 'update') {
            return (
              <FormItem
                {...formItemLayout}
                label='ID'
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''}
              >
                {getFieldDecorator('id', {
                  rules: [{ required: true }]
                })(
                  <Input disabled />
                )}
              </FormItem>
            )
          }
        }())}

        <FormItem
          {...formItemLayout}
          label='目录名称'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input catalogue name!' }]
          })(
            <Input
              prefix={<Icon type='folder' style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='目录名称'
            />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='路由名称'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('key', {
            rules: [{ required: true, message: 'Please input catalogue key!' }]
          })(
            <Input placeholder='路由名称' />
          )}
        </FormItem>

        <FormItem {...formTailLayout}>
          <Button
            type='primary'
            htmlType='submit'
            disabled={hasErrors(getFieldsError())}
          >
            {label}
          </Button>

          {(function() {
            if (mode === 'update') {
              return (
                <Popconfirm
                  placement='top'
                  title='确认删除么?'
                  okText='确认'
                  cancelText='取消'
                  onConfirm={onDelete}
                >
                  <Button
                    style={{ marginLeft: '8px' }}
                    type='danger'
                  >
                    删除
                  </Button>
                </Popconfirm>
              )
            }
          }())}
        </FormItem>
      </Form>
    )
  }
}

const WrappedFormCatalogue = Form.create({
  mapPropsToFields(props) {
    const { initValue = {}, mode } = props
    if (mode === 'update') {
      return {
        id: Form.createFormField({
          value: initValue.id
        }),
        name: Form.createFormField({
          value: initValue.name
        }),
        key: Form.createFormField({
          value: initValue.key
        })
      }
    }
  }
})(FormCatalogue)

export default WrappedFormCatalogue
