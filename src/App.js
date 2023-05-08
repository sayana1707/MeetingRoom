import React, { useState } from 'react';
import { Typography, Stack, Box, Button, FormControl, InputLabel, MenuItem, 
Select, Snackbar, TextField, Alert } from '@mui/material';


const BookingForm = () => {
  // Дата и время по умолчанию
  const defaultDate = new Date().toISOString().slice(0, 10);
  const defaultStartTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const defaultEndTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  // Данные формы
  const [formData, setFormData] = useState({
    tower: '',
    floor: '',
    room: '',
    date: defaultDate,
    startTime: defaultStartTime,
    endTime: defaultEndTime,
    comment: ''
  });

  const [success, setSuccess] = useState(false); // уведомление об успешной отправке формы
  const [warning, setWarning] = useState(false); // предупреждение - заполнены не все обязательные поля 
  
  const handleChange = (event) => { // обработчик изменения данных
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => { // обработчик отправки формы
    event.preventDefault();
    const { tower, floor, room } = formData;
    if (!tower || !floor || !room) { // если не заполнены обязательные поля - башня, этаж, переговорная
      setSuccess(false); // скрыть сообщение об успешной отправке
      setWarning(true); // показать предупреждение "Введите данные"
      return;
    }
    setFormData({ ...formData, [event.target.name]: event.target.value }); // сохраняем данные, если заполнены поля

    console.log(JSON.stringify(formData)); // вывод данных в консоль
    setSuccess(true);
  };

  const handleClear = () => { // обработчик очистки формы
    setFormData({
      tower: '',
      floor: '',
      room: '',
      date: defaultDate,
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      comment: ''
    });
  };

  const handleClose = (event, reason) => { // обработчик закрытия уведомления
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    setWarning(false)
  };

  return (
    <Stack alignItems="center"> 
      <Box sx={{  width: { xs: '280px', sm: '440px', md: '550px'} }}> 
        <Typography variant='h5' fontWeight='bold' mt={2} mb={2} sx={{ color: 'black', textAlign: 'center' }}>
          Форма бронирования переговорной
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl fullWidth mb={2}>
              <InputLabel id="tower-label">Башня</InputLabel>
              <Select
                labelId="tower-label"
                id="tower"
                name="tower"
                value={formData.tower}
                label="Башня"
                onChange={handleChange}
              >
                <MenuItem value="A">А</MenuItem>
                <MenuItem value="B">Б</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth mb={2}>
              <InputLabel id="floor-label">Этаж</InputLabel>
              <Select
                labelId="floor-label"
                id="floor"
                name="floor"
                value={formData.floor}
                label="Этаж"
                onChange={handleChange}
              >
                {[...Array(25)].map((_, i) => (
                  <MenuItem key={i} value={i + 3}>
                    {i + 3}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            </Box>
            <FormControl fullWidth mb={2}>
              <InputLabel id="room-label">Переговорная</InputLabel>
              <Select
                labelId="room-label"
                id="room"
                name="room"
                value={formData.room}
                label="Переговорная"
                onChange={handleChange}
              >
                {[...Array(10)].map((_, i) => (
                  <MenuItem key={i} value={i + 1}>
                    {i + 1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              id="date"
              label="Дата"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true
              }}
              mb={2}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
              <TextField
                fullWidth
                id="start-time"
                label="Время начала"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  // Отключение валидации
                  error: false,
                }}
                mb={2}
              />
              <TextField
                fullWidth
                id="end-time"
                label="Время окончания"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true
                }}
                InputProps={{
                  error: false,
                }}
                mb={2}
              />
            </Box>
            <TextField
              fullWidth
              id="comment"
              label="Комментарий"
              name="comment"
              multiline
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              mb={2}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant='contained' type='submit'>Отправить</Button>
              <Button variant='outlined' onClick={handleClear}>Очистить</Button>
            </Box>
            <Snackbar open={success} autoHideDuration={5000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                Форма отправлена!
              </Alert>
            </Snackbar>
            <Snackbar open={warning} autoHideDuration={5000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                Введите данные!
              </Alert>
            </Snackbar>
          </Box>
        </form>
      </Box>
    </Stack>
  )};
  
export default BookingForm;