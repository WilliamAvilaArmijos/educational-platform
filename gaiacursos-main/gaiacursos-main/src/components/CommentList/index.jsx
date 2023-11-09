import React, { Component } from 'react'
import { List, Avatar, Input, Button, Switch } from 'antd'
import './styles.scss'

const data = [
  {
    avatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    title: 'Apple Seed',
    description:
      'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, inventore laboriosam!',
  },
  {
    avatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    title: 'Banana Long',
    description:
      'Iusto ex ad placeat dolor tempora dolores provident hic, modi voluptatem deserunt possimus, architecto dignissimos quod fugiat enim iste, corporis neque numquam.',
  },
  {
    avatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    title: 'Clementine Sour',
    description:
      'Ullam unde accusamus laboriosam enim, quam, sit ipsum amet ex repudiandae velit ipsa voluptatibus quasi impedit cupiditate, obcaecati delectus exercitationem iure quas.',
  },
  {
    avatar:
      'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
    title: 'Dates Dune',
    description:
      'Modi porro officia nesciunt cumque, debitis eum accusamus expedita, adipisci autem quos consectetur repudiandae inventore voluptas voluptate minus! Natus ducimus quisquam ipsa.',
  },
]

class CommentList extends Component {
  state = {
    data,
    add: {
      avatar: '',
      title: '',
      description: '',
      checked: true,
    },
  }

  onInputChange = (e, type) => {
    const add = { ...this.state.add }
    add[type] = e.target.value
    this.setState({ add })
  }

  onAddContact = () => {
    const { data, add } = this.state

    if (!add.title) return

    add.avatar = add.checked
      ? `https://api.adorable.io/avatars/96/${add.title.replace(/ +/, '')}@adorable.png`
      : add.title.replace(/ +/, ' ')
    add.title = add.title
      .split(' ')
      .map(str => str[0] && str[0].toUpperCase() + str.slice(1))
      .join(' ')
    add.description = add.description[0].toUpperCase() + add.description.slice(1)

    this.setState({
      data: [...data, add],
    })
  }

  onSwitchOn = checked => {
    const add = { ...this.state.add }
    add.checked = checked
    this.setState({ add })
  }

  render() {
    const { data, add } = this.state
    const { title, description } = add

    return (
      <div className='CommentList'>
        <List
          itemLayout='horizontal'
          dataSource={data}
          renderItem={item => (
            <List.Item style={{ color: 'white' }}>
              <List.Item.Meta avatar={<Avatar src={item.avatar} />} title={item.title} description={item.description} />
            </List.Item>
          )}
          style={{
            width: '100%',
          }}
        />
        <form className='CommentList__form' autoComplete='off'>
          <div className='CommentList__input'>
            <label htmlFor='name' style={{ color: 'white' }}>
              Nombre
            </label>
            <Input
              value={title}
              placeholder='Your beautiful name here'
              id='name'
              onChange={e => this.onInputChange(e, 'title')}
            />
          </div>
          <div className='CommentList__input'>
            <label htmlFor='description' style={{ color: 'white' }}>
              Descripción
            </label>
            <Input
              value={description}
              placeholder='Your beautiful description here'
              id='description'
              onChange={e => this.onInputChange(e, 'description')}
            />
          </div>
          <div className='CommentList__add'>
            <Button onClick={this.onAddContact} style={{ marginRight: '1em' }} disabled={!add.title}>
              Agregar
            </Button>
            <Switch defaultChecked checkedChildren='👦' onChange={this.onSwitchOn} style={{ minWidth: '48px' }} />
          </div>
        </form>
      </div>
    )
  }
}

export default CommentList
