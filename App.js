import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      url: "",
      authorId: "",
      posts: []
    };
  }

  submitPost = () => {
    const newPost = {
      url: this.state.url,
      authorId: this.state.authorId
    };
    console.log(newPost);
    //TODO Can't do http here
    fetch("http://localhost:3000/post", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newPost)
    })
      .then(resp => resp.json())
      .then(data => {
        const posts = this.state.posts;

        posts.push(data);

        this.setState({
          posts,
          authorId: "",
          url: ""
        });
      })
      .catch(e => console.log(e));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Author Id</Text>
        <TextInput
          style={{ width: 200 }}
          value={this.state.authorId}
          onChangeText={authorId => {
            this.setState({ authorId });
          }}
        />
        <Text>Post Url</Text>
        <TextInput
          style={{ width: 200 }}
          value={this.state.url}
          onChangeText={url => this.setState({ url })}
        />
        <Button
          onPress={() => {
            this.submitPost();
          }}
          title="Submit"
        />

        {this.state.posts.map((post, i) => (
          <Text key={post.url + post.authorId}>
            URL: {post.url}, By User: {post.authorId}
          </Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
