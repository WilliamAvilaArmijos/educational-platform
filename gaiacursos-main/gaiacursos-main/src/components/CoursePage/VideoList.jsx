import { CheckCircleFilled } from '@ant-design/icons'
import { List, Typography, Space } from 'antd'

function VideoList({ videos, wv, hv }) {
  return (
    <List
      itemLayout='horizontal'
      dataSource={videos}
      renderItem={video => (
        <List.Item
          style={{
            marginTop: '10px',
            borderRadius: '10px',
            backgroundColor: video.wasVisited ? '' : 'rgb(31, 42, 85, 0.5)',
          }}
        >
          <Space direction='horizontal'>
            <CheckCircleFilled style={{ color: video.wasVisited ? 'green' : 'gray' }} />
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
              <Typography.Title level={4}>{video.title}</Typography.Title>
              <Typography.Paragraph>{video.description}</Typography.Paragraph>
            </div>
          </Space>
        </List.Item>
      )}
    />
  )
}
export default VideoList
