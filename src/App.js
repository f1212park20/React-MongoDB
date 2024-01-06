import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Card, Modal } from 'react-bootstrap';

import axios from 'axios';

function ImageUpload() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [diaries, setDiaries] = useState([]);
  const [showModal, setShowModal] = useState({ id: null, show: false });



  useEffect(() => {
    fetchDiaries();
  }, []); // 컴포넌트가 처음 렌더링 될 때만 실행

  const fetchDiaries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/diaries');
      setDiaries(response.data.diaries);
    } catch (error) {
      console.error('Error fetching diaries:', error);
    }
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleDiarySubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('image', image);

      
      // 새로운 일기 등록
      await axios.post('http://localhost:5000/api/upload', formData);
      
      fetchDiaries(); // 업로드 후 목록을 다시 불러옴
      // 입력 필드 초기화
      setTitle('');
      setContent('');
      setImage(null);
      
    } catch (error) {
      console.error('Error submitting diary:', error);    }
  };

   const handleEditClick = (diary) => {
    setTitle(diary.title);
    setContent(diary.content);
    setShowModal(true);
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/upload/${id}`);
      fetchDiaries();
    } catch (error) {
      console.error('Error deleting diary:', error);
    }
  };

  
  const handleCloseModal = () => {
    setShowModal({ id: null, show: false });
    setTitle('');
    setContent('');
    setImage(null);
    
  };

  const handleShowModal = (id) => {
    const diaryToEdit = diaries.find((diary) => diary._id === id);
    if (diaryToEdit) {
      setShowModal({ id, show: true });
      setTitle(diaryToEdit.title);
      setContent(diaryToEdit.content);
      // 이미지는 수정시에 변경하지 않도록 둘 것인지 여부에 따라 조정
    }
  };


  const handleEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      formData.append('content', content);

      await axios.put(`http://localhost:5000/api/upload/${showModal.id}`, formData);

      // 수정 후 목록 다시 불러오기
      fetchDiaries();
      // 수정 상태 초기화
      handleCloseModal();
    } catch (error) {
      console.error('이미지 수정 중 오류 발생:', error);
    }
  };
  

  return (
    <Container className="mt-5">
        <Form>
        <Form.Group controlId="title">
          <Form.Label>Title:</Form.Label>
          <Form.Control type="text" value={title} onChange={handleTitleChange} />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content:</Form.Label>
          <Form.Control as="textarea" rows={3} value={content} onChange={handleContentChange} />
        </Form.Group>

        <Form.Group controlId="image">
          <Form.Label>Image:</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
        </Form.Group>
        
        
      </Form>
      {showModal.id ? (
        <Button variant="primary" onClick={handleEditClick}>
         일기 수정
        </Button>
        ) : (
          <Button variant="primary" onClick={handleDiarySubmit}>
          일기 등록
        </Button>
        )}


      
        {/* 수정 모달 */}
      <ul>
        {diaries.map((diary) => (
          <li key={diary._id}>
            <img src={`http://localhost:5000${diary.imageUrl}`} alt={diary.title} />
            <h2>{diary.title}</h2>
            <p>{diary.content}</p>
            <button onClick={() => handleShowModal(diary._id)}>Edit</button>
            <button onClick={() => handleDeleteClick(diary._id)}>Delete</button>
          </li>
        ))}
      </ul>

      <Modal show={showModal.show} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Diary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>


    </Container>  
  );
}

export default ImageUpload;