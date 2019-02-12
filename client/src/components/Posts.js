import React from 'react';
import axios from 'axios';

class Posts extends React.Component {
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('http://localhost:4000/api/posts')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        console.log(this.state)
        return (
            <>
                {this.state.posts.map(post => {
                    return (
                        <div key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                        </div>
                    )
                })}
            </>
        )
    }
}

export default Posts;