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
} from 'react-native-paper';

const { width, height } = Dimensions.get('window');
const scale = size => (width / 320) * size;

const NotificationItem = ({ notification, onPress }) => {
  const theme = useTheme();
  
  return (
    <>
      <List.Item
        title={notification.title}
        description={notification.description}
        left={props => (
          <View style={styles.avatarContainer}>
            <Avatar.Text
              size={48}
              label={notification.avatar}
              style={[
                styles.avatar,
                { backgroundColor: notification.unread ? theme.colors.primary : theme.colors.surfaceVariant }
              ]}
            />
            {notification.unread && <Badge style={styles.badge} />}
          </View>
        )}
        right={props => (
          <View style={styles.rightContent}>
            <Text style={styles.timeText}>{notification.time}</Text>
            {notification.action && (
              <Button
                mode="contained"
                onPress={onPress}
                style={styles.actionButton}
                labelStyle={styles.actionButtonLabel}
              >
                {notification.action}
              </Button>
            )}
          </View>
        )}
        style={[
          styles.notificationItem,
          { backgroundColor: notification.unread ? '#edf3ff' : 'white' }
        ]}
      />
      <Divider />
    </>
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

  // For testing, set this to empty array to see empty state
  const notifications = [];

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
                onPress={notification.onPress || (() => {})}
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
  },
  notificationItem: {
    paddingVertical: scale(12),
  },
  avatarContainer: {
    marginLeft: scale(16),
    marginRight: scale(8),
    justifyContent: 'center',
  },
  avatar: {
    marginVertical: scale(8),
  },
  badge: {
    position: 'absolute',
    bottom: scale(8),
    right: 0,
    backgroundColor: '#4CAF50',
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingRight: scale(16),
    height: '100%',
  },
  timeText: {
    fontSize: scale(12),
    color: '#666',
    marginBottom: scale(4),
  },
  actionButton: {
    marginTop: scale(8),
  },
  actionButtonLabel: {
    fontSize: scale(12),
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
