<template>
    <div class="post-feed">
        <div class="container">
            <div class="post" v-for="post in posts" :key="post.id">
                <div class="post-header">
                    <img :src="post.userAvatar" alt="User Avatar" class="user-avatar" />
                    <span class="username">{{ post.username }}</span>
                </div>
                <img :src="post.imageUrl" alt="Post Image" class="post-image" />
                <div class="post-actions">
                    <button @click="likePost(post.id)">
                        <i class="fa fa-heart"></i> {{ post.likes }}
                    </button>
                    <button @click="commentPost(post.id)">
                        <i class="fa fa-comment"></i> {{ post.comments }}
                    </button>
                </div>
                <div class="post-caption">{{ post.caption }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PostFeed',
    data() {
        return {
            posts: [
                {
                    id: 1,
                    username: "username1",
                    userAvatar:  require('@/assets/profile.jpg'),
                    imageUrl:  require('@/assets/post1.png'),
                    likes: 100,
                    comments: 10,
                    caption: "This is the first post.",
                },
                {
                    id: 2,
                    username: "username2",
                    userAvatar: require('@/assets/profile.jpg'),
                    imageUrl: require('@/assets/post2.png'),
                    likes: 200,
                    comments: 20,
                    caption: "Another great post.",
                },
                // Add more posts here...
            ],
        };
    },
    methods: {
       /* likePost(postId) {
            // Implement liking a post (e.g., send a request to the backend).
        },
        commentPost(postId) {
            // Implement commenting on a post (e.g., open a comment modal).
       },*/
    },
};
</script>

<style scoped>
.post-feed {
    display: flex;
    justify-content: center;
    padding: 20px;
}

.container {
    max-width: 600px;
}

.post {
    margin: 20px 0;
    border: 1px solid #ddd;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.post-header {
    display: flex;
    align-items: center;
    padding: 10px;
}

.user-avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
}

.username {
    font-weight: 500;
}

.post-image {
    width: 100%;
}

.post-actions {
    display: flex;
    justify-content: space-between;
    padding: 10px;
}

.post-actions button {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
}

.post-caption {
    padding: 10px;
}

</style>
