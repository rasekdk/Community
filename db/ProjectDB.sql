CREATE SCHEMA IF NOT EXISTS news;
USE news;

CREATE TABLE users (
	userName VARCHAR(25) NOT NULL,
	userPassword VARCHAR(255) NOT NULL,
	userEmail VARCHAR(255) NOT NULL,
    UserAvatar VARCHAR(255),
    userBio VARCHAR(255),
	PRIMARY KEY(userName)
);

CREATE TABLE community (
	communityId INT AUTO_INCREMENT,
    communityName VARCHAR(30) NOT NULL,
    PRIMARY KEY(communityId)
);

ALTER TABLE community ADD communityCreator VARCHAR(25) NOT NULL, ADD FOREIGN KEY (communityCreator) REFERENCES users(userName);

CREATE TABLE users_communityFollow (
	userName VARCHAR(255) NOT NULL,
    communityId INT NOT NULL, 
    FOREIGN KEY (userName) REFERENCES users(userName),
    FOREIGN KEY (communityId) REFERENCES community(communityId),
    PRIMARY KEY (userName, communityId)
);

CREATE TABLE users_communityModeration (
	userName VARCHAR(255) NOT NULL,
    communityId INT NOT NULL, 
    FOREIGN KEY (userName) REFERENCES users(userName),
    FOREIGN KEY (communityId) REFERENCES community(communityId),
    PRIMARY KEY (userName, communityId)
);

CREATE TABLE post (
	postId INT NOT NULL,
    postTitle VARCHAR(255) NOT NULL,
    postText VARCHAR(255),
    postLink VARCHAR(255),
    postImg VARCHAR(255),
    postCommunity INT NOT NULL,
    FOREIGN KEY (postCommunity) REFERENCES community(communityId),
    PRIMARY KEY (postId)
);

CREATE TABLE comments (
	commentId INT NOT NULL,
    commentText VARCHAR(255),
    PRIMARY KEY (commentId)
);

CREATE TABLE thread (
	threadId INT AUTO_INCREMENT,
    threadFather INT NOT NULL,
    FOREIGN KEY (threadFather) REFERENCES post(postId),
    FOREIGN KEY (threadFather) REFERENCES comments(commentId),
    PRIMARY KEY (threadId)
);

CREATE TABLE users_threadVotes (
    voteType CHAR(1), 
	userName VARCHAR(255) NOT NULL,
    threadId INT NOT NULL, 
    FOREIGN KEY (userName) REFERENCES users(userName),
    FOREIGN KEY (threadId) REFERENCES thread(threadId),
    PRIMARY KEY (userName, threadId)
);

ALTER TABLE comments ADD FOREIGN KEY (commentId) REFERENCES thread(threadId);

ALTER TABLE post ADD FOREIGN KEY (postId) REFERENCES thread(threadId);