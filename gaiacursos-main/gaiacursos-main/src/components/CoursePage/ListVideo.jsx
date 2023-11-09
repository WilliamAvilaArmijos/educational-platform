import { ClockCircleOutlined } from '@ant-design/icons'
import { List, Typography, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import './styles.scss'
function ListVideo({ videos, wv, hv }) {
  const navigate = useNavigate()
  return (
    <List
      itemLayout='horizontal'
      dataSource={videos}
      renderItem={video => (
        <List.Item onClick={() => navigate('/video')} className='itemVideo'>
          <Space direction='horizontal'>
            <div style={{ width: wv, height: hv }}>
              <iframe
                title={video.title}
                width='100%'
                height='100%'
                src={`https://www.youtube.com/embed/${video.id}`}
                frameBorder='0'
                allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
              />
            </div>
            <div>
              <Typography.Title style={{ color: 'white' }} level={4}>
                {video.title}
              </Typography.Title>
              <Typography.Paragraph style={{ color: 'white' }}>
                <ClockCircleOutlined /> {video.duracion} minutos
              </Typography.Paragraph>
            </div>
          </Space>
        </List.Item>
      )}
    />
  )
}
export default ListVideo
