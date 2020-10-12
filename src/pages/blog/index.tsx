import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, makeStyles } from '@material-ui/core';
import dayjs from 'dayjs';
import { graphql } from 'gatsby';

import { BlogPostDialog } from '../../components/BlogPost';
import { BlogPost } from '../../components/BlogPostComponent';
import { DetailsCard } from '../../components/DetailsCard';
import { Navbar } from '../../components/Navbar';
import { SectionTitle } from '../../components/SectionTitle';
import { useDeveloperProfile } from '../../containers/DeveloperProfile';
import { useComponentType } from '../../hooks/useComponentType';
import { FC } from '../../typings/components';
import { BlogGQL } from '../../views/blog-page/types';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      padding: theme.spacing(8, 2, 0, 2),
    },
  },
  aside: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'block',
      position: 'sticky',
      top: theme.spacing(8),
      height: 668,
      width: 280,
      marginRight: theme.spacing(4),
    },
  },
  main: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('lg')]: {
      width: '100%',
    },
  },
  mainContent: {
    backgroundColor: theme.palette.background.paper,
    margin: theme.spacing(0, 0, 7, 0),

    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing(0, 3, 7, 3),
      borderRadius: 16,
    },

    [theme.breakpoints.up('lg')]: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(0, 0, 7, 0),
      boxShadow: '0 40px 50px 0 rgba(103, 118, 128, 0.1)',
    },
  },
  navbar: {
    marginBottom: theme.spacing(2),

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },

    [theme.breakpoints.up('lg')]: {
      marginBottom: theme.spacing(7),
    },
  },
  blogContainer: {
    borderRadius: 16,
    padding: theme.spacing(4, 3, 3, 3),

    [theme.breakpoints.up('lg')]: {
      width: '100%',
      padding: theme.spacing(4),
    },
  },
  blogPosts: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridRowGap: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
      gridRowGap: theme.spacing(3),
    },

    [theme.breakpoints.up('md')]: {
      gridTemplateColumns: '400px 400px',
      alignItems: 'center',
      justifyContent: 'center',
      gridGap: theme.spacing(5),
    },
  },
  title: {
    marginBottom: theme.spacing(4),

    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
    },

    [theme.breakpoints.up('lg')]: {
      margin: theme.spacing(0, 2, 4, 2),
    },
  },
  blogPost: {
    boxShadow: '0 8px 20px 0 rgba(68, 86, 108, 0.1)',

    [theme.breakpoints.up('sm')]: {
      maxWidth: 800,
    },

    [theme.breakpoints.up('lg')]: {
      maxWidth: 400,
    },
  },
}));

const BlogPage: FC<{ data: BlogGQL }> = ({ data }) => {
  const blogData = data.markdownRemark.blogPage;
  const classes = useStyles();
  const { componentType, isDesktop } = useComponentType();
  const developerProfile = useDeveloperProfile();
  const [selectedBlogpost, setSelectedBlogpost] = useState(-1);

  // no blogpost will have index equal to -1 therefore no blogpost will be selected
  const handleCloseBlogpost = () => {
    setSelectedBlogpost(-1);
  };
  // if is first blogpost, choose last blogpost
  const handlePrevBlogpost = (index: number) => {
    setSelectedBlogpost(index === 0 ? blogData.blogPost.length - 1 : index - 1);
  };

  // if is last blogpost, choose first blogpost
  const handleNextBlogpost = (index: number) => {
    setSelectedBlogpost(index === blogData.blogPost.length - 1 ? 0 : index + 1);
  };

  return (
    <Container className={classes.container}>
      <Helmet>
        <title>{blogData.blogPostTitle}</title>
      </Helmet>
      {isDesktop && (
        <Box className={classes.aside}>
          <DetailsCard type={componentType} />
        </Box>
      )}
      <Box className={classes.main}>
        <Navbar
          className={classes.navbar}
          type={componentType}
          fullName={`${developerProfile.firstName} ${developerProfile.lastName}`}
          position={developerProfile.position}
          image={developerProfile.avatar.publicURL}
          resumeLink={developerProfile.cv}
        />
        <Box className={classes.mainContent}>
          <Box className={classes.blogContainer}>
            <SectionTitle className={classes.title}>Blog</SectionTitle>
            <Box className={classes.blogPosts}>
              {blogData.blogPost.map((blogPost, index) => (
                <div key={`${blogPost.blogTitle}-${blogPost.blogDescription}`}>
                  <BlogPost
                    className={classes.blogPost}
                    image={blogPost.blogImage.publicURL}
                    tagName={blogPost.blogLabel}
                    text={blogPost.blogDescription}
                    title={blogPost.blogTitle}
                    date={dayjs(blogPost.publishDate).format('DD MMMM YYYY')}
                    onClick={() => setSelectedBlogpost(index)}
                  />
                  <BlogPostDialog
                    contentheader={blogPost.blogDescription}
                    contentmain={blogPost.blogBody}
                    imgurl={blogPost.blogImage.publicURL}
                    isOpen={index === selectedBlogpost}
                    subtitle={dayjs(blogPost.publishDate).format('DD MMMM YYYY')}
                    tagtitle={blogPost.blogLabel}
                    title={blogPost.blogTitle}
                    type={componentType}
                    handleClose={() => handleCloseBlogpost()}
                    handlePrev={() => handlePrevBlogpost(index)}
                    handleNext={() => handleNextBlogpost(index)}
                  />
                </div>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogPage;

export const pageQuery = graphql`
  query BlogPage {
    markdownRemark(fileAbsolutePath: { regex: "/blog/index-1.md/" }) {
      blogPage: frontmatter {
        blogPostTitle
        blogPost {
          blogTitle
          blogLabel
          blogBody
          blogDescription
          blogImage {
            publicURL
          }
          publishDate
        }
      }
    }
  }
`;