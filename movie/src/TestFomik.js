import React, { useState } from 'react';

const AddShowtimeForm = () => {
  // State để quản lý các giờ chiếu
  const [showtimes, setShowtimes] = useState(['']); 

  // Hàm thêm giờ chiếu mới
  const handleAddShowtime = () => {
    setShowtimes([...showtimes, '']); // Thêm một input cho giờ chiếu
  };

  // Hàm xử lý thay đổi giá trị của từng giờ chiếu
  const handleShowtimeChange = (index, value) => {
    const newShowtimes = [...showtimes];
    newShowtimes[index] = value; // Cập nhật giá trị cho giờ chiếu đã thay đổi
    setShowtimes(newShowtimes);
  };

  // Hàm submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedDate = e.target.date.value;
    console.log('Ngày chiếu:', selectedDate);
    console.log('Giờ chiếu:', showtimes);
    // Xử lý logic lưu dữ liệu vào database tại đây
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Ngày chiếu:</label>
      <input type="date" id="date" name="date" required />

      {showtimes.map((showtime, index) => (
        <div key={index}>
          <label htmlFor={`showtime-${index}`}>Giờ chiếu {index + 1}:</label>
          <input
            type="time"
            id={`showtime-${index}`}
            value={showtime}
            onChange={(e) => handleShowtimeChange(index, e.target.value)}
            required
          />
        </div>
      ))}

      <button type="button" onClick={handleAddShowtime}>
        Thêm giờ chiếu
      </button>

      <button type="submit">Lưu Showtime</button>
    </form>
  );
};

export default AddShowtimeForm;
