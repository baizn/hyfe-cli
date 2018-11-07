/*
 * @Author: liqi@hiynn.com
 * @Date: 2018-09-11 15:05:43
 * @Description: 产品或项目表单
 * @Last Modified by: liqi@hiynn.com
 * @Last Modified time: 2018-09-17 11:46:00
 */

import React, { Component } from 'react'
import { Form, Icon, Input, Button, Upload, Popconfirm } from 'antd'

const FormItem = Form.Item

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

class FormProduct extends Component {
  componentDidMount() {
    const { validateFields } = this.props.form
    validateFields()
  }

  normFile = (e) => {
    if (Array.isArray(e)) {
      return e
    }
    return e && e.fileList
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
      getFieldDecorator, getFieldsError, getFieldError, isFieldTouched
    } = form
    const nameError = isFieldTouched('name') && getFieldError('name')

    const formItemLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8 }
    }

    const formTailLayout = {
      labelCol: { span: 4 },
      wrapperCol: { span: 8, offset: 4 }
    }

    return (
      <Form onSubmit={this.handleSubmit}>

        {/* 只有当处于编辑模式时, 才会显示和提交 id */}
        {(function() {
          if (mode === 'update') {
            return [
              <FormItem
                {...formItemLayout}
                key='id'
                label='ID'
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''}
              >
                {getFieldDecorator('id')(
                  <Input disabled />
                )}
              </FormItem>,
              <FormItem
                {...formItemLayout}
                key='oldFile'
                label='图片地址'
                validateStatus={nameError ? 'error' : ''}
                help={nameError || ''}
              >
                {getFieldDecorator('oldFile')(
                  <Input disabled />
                )}
              </FormItem>
            ]
          }
        }())}

        <FormItem
          {...formItemLayout}
          label='产品名称'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input catalogue name!' }]
          })(
            <Input placeholder='目录名称' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='产品目标'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('goal')(
            <Input placeholder='产品目标' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='产品定位'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('locate')(
            <Input placeholder='产品定位' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='功能描述'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('introduction')(
            <Input.TextArea rows={4} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='实施环境'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('environment')(
            <Input placeholder='实施环境' />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='备注'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('remark', {
            rules: [{ required: false }]
          })(
            <Input.TextArea rows={4} />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label='URL'
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {getFieldDecorator('href', {
            rules: [{ required: true, message: 'Please input catalogue href!' }]
          })(
            <Input placeholder='URL' />
          )}
        </FormItem>

        <FormItem
          {...formTailLayout}
        >
          {getFieldDecorator('fileList', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile
          })(
            <Upload listType='picture'>
              <Button>
                <Icon type='upload' /> 上传图片
              </Button>
            </Upload>
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

const WrappedFormProduct = Form.create({
  mapPropsToFields(props) {
    const { initValue = {}, mode } = props
    if (mode === 'update') {
      return {
        id: Form.createFormField({
          value: initValue.id
        }),
        oldFile: Form.createFormField({
          value: initValue.pic
        }),
        name: Form.createFormField({
          value: initValue.name
        }),
        goal: Form.createFormField({
          value: initValue.goal
        }),
        locate: Form.createFormField({
          value: initValue.locate
        }),
        introduction: Form.createFormField({
          value: initValue.introduction
        }),
        environment: Form.createFormField({
          value: initValue.environment
        }),
        remark: Form.createFormField({
          value: initValue.remark
        }),
        href: Form.createFormField({
          value: initValue.href
        })
      }
    }
  }
})(FormProduct)

export default WrappedFormProduct
