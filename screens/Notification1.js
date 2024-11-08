import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import {
  Appbar,
  List,
  Avatar,
  Badge,
  Text,
  useTheme,
  Divider,
  Button,
  SegmentedButtons,
  IconButton,
  Surface,
  Card,
} from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const scale = size => (width / 320) * size;

const NotificationItem = ({ notification, onPress }) => {
  const theme = useTheme();
  
  return (
    <Card style={styles.notificationCard}>
      <Card.Content style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <View style={styles.avatarContainer}>
            <Avatar.Icon
              size={40}
              icon={notification.icon}
              style={[
                styles.avatar,
                { backgroundColor: notification.unread ? theme.colors.primary : theme.colors.surfaceVariant }
              ]}
            />
            {notification.unread && <Badge style={styles.badge} />}
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{notification.title}</Text>
            <Text style={styles.description}>{notification.description}</Text>
            <Text style={styles.timeText}>{notification.time}</Text>
          </View>
        </View>
        {notification.action && (
          <Button
            mode="contained"
            onPress={onPress}
            style={styles.actionButton}
          >
            {notification.action}
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

const EmptyNotification = () => (
  <View style={styles.emptyContainer}>
    <IconButton
      icon="bell-off-outline"
      size={50}
      iconColor="#666"
    />
    <Text style={styles.emptyText}>Chưa có thông báo nào</Text>
  </View>
);

const Notification1 = ({ navigation }) => {
  const [filter, setFilter] = useState('all');
  const theme = useTheme();

  const notifications = [
    {
      id: '1',
      title: 'Xác nhận lịch hẹn',
      description: 'Lịch hẹn với Bác sĩ Sarah Johnson vào ngày 20/01/2024 lúc 10:00 đã được xác nhận',
      icon: 'calendar-check',
      time: '5 phút trước',
      unread: true,
      action: 'Xem chi tiết'
    },
    {
      id: '2',
      title: 'Nhắc nhở cuộc hẹn',
      description: 'Bạn có cuộc hẹn với Bác sĩ John Smith vào ngày mai lúc 9:00',
      icon: 'clock-alert',
      time: '1 giờ trước',
      unread: true,
      action: 'Xác nhận'
    },
    {
      id: '3',
      title: 'Kết quả xét nghiệm',
      description: 'Kết quả xét nghiệm của bạn đã có. Vui lòng kiểm tra.',
      icon: 'file-document',
      time: '2 giờ trước',
      unread: true,
      action: 'Xem kết quả'
    },
    {
      id: '4',
      title: 'Đánh giá dịch vụ',
      description: 'Hãy đánh giá trải nghiệm khám bệnh của bạn với Bác sĩ Sarah Johnson',
      icon: 'star',
      time: '1 ngày trước',
      unread: false,
      action: 'Đánh giá'
    },
    // Thêm các thông báo đã đọc
    {
      id: '5',
      title: 'Lời nhắc uống thuốc',
      description: 'Đã đến giờ uống thuốc theo đơn của Bác sĩ Smith. Hãy uống thuốc đúng giờ nhé!',
      icon: 'pill',
      time: '2 ngày trước',
      unread: false,
      action: 'Đánh dấu đã uống'
    },
    {
      id: '6',
      title: 'Hoàn thành thanh toán',
      description: 'Thanh toán cho cuộc hẹn ngày 15/01/2024 đã được xác nhận. Cảm ơn bạn!',
      icon: 'credit-card-check',
      time: '3 ngày trước',
      unread: false
    },
    {
      id: '7',
      title: 'Tư vấn sức khỏe',
      description: 'Bác sĩ David Brown đã trả lời câu hỏi của bạn về chế độ ăn uống',
      icon: 'message-reply',
      time: '4 ngày trước',
      unread: false,
      action: 'Xem trả lời'
    },
    {
      id: '8',
      title: 'Cập nhật hồ sơ',
      description: 'Hồ sơ sức khỏe của bạn đã được cập nhật với kết quả khám mới nhất',
      icon: 'folder-check',
      time: '5 ngày trước',
      unread: false,
      action: 'Xem hồ sơ'
    },
    {
      id: '9',
      title: 'Chương trình khám sức khỏe',
      description: 'Gói khám sức khỏe tổng quát đang giảm 30% trong tháng này',
      icon: 'percent',
      time: '6 ngày trước',
      unread: false,
      action: 'Tìm hiểu thêm'
    },
    {
      id: '10',
      title: 'Thay đổi lịch hẹn',
      description: 'Lịch hẹn của bạn đã được dời từ 9:00 sang 10:30 theo yêu cầu',
      icon: 'calendar-edit',
      time: '1 tuần trước',
      unread: false
    }
  ];

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.unread);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Thông báo" />
        {notifications.length > 0 && (
          <Appbar.Action 
            icon="check-all" 
            onPress={() => {}} 
            tooltip="Đánh dấu tất cả đã đọc"
          />
        )}
      </Appbar.Header>

      {notifications.length > 0 ? (
        <>
          <Surface style={styles.filterContainer}>
            <SegmentedButtons
              value={filter}
              onValueChange={setFilter}
              buttons={[
                { value: 'all', label: `Tất cả (${notifications.length})` },
                { value: 'unread', label: `Chưa đọc (${notifications.filter(n => n.unread).length})` },
              ]}
            />
          </Surface>

          <ScrollView style={styles.scrollView}>
            {filteredNotifications.map(notification => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onPress={() => {}}
              />
            ))}
          </ScrollView>
        </>
      ) : (
        <EmptyNotification />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    padding: scale(16),
    elevation: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  notificationCard: {
    marginBottom: 8,
    elevation: 2,
  },
  notificationContent: {
    padding: 12,
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    backgroundColor: '#4CAF50',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#f44336',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
  },
  actionButton: {
    marginTop: 8,
    alignSelf: 'flex-end',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});

export default Notification1;
