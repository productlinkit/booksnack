// Edit name / email.
const p = profile();
$('#pName').value = p.name; $('#pEmail').value = p.email;
const syncAvatar = () => $('#avatar').textContent = ($('#pName').value.trim()[0] || '?').toUpperCase();
$('#pName').oninput = syncAvatar;
$('#profileForm').onsubmit = e => {
  e.preventDefault();
  store.set('profile', { name: $('#pName').value.trim(), email: $('#pEmail').value.trim() });
  toast('Profile updated'); setTimeout(() => location.href = 'profile.html', 700);
};
syncAvatar();
