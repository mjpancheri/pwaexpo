import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, StyleSheet } from 'react-native';

// import { Container } from './styles';

interface Member {
  login: string;
  avatar_url: string;
}
const Main: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch('https://api.github.com/orgs/rocketseat/members').then(response => {
      response.json().then(data => {
        setMembers(data);
      })
    })
  }, []);

  return (
    <FlatList style={{marginTop: 32}}
      data={members}
      keyExtractor={member => member.login}
      renderItem={({item: member}) => (
        <View style={styles.member}>
          <Image style={styles.image} source={{ uri: member.avatar_url }} />
          <Text>{member.login}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  member: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  image: {
    width: 32,
    height: 32,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 16
  }
})

export default Main;