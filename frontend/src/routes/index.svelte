<script lang="ts">
    import axios from 'axios';


    let result = '';
    let password = '';
    let username = '';


    let register = async () => {
        let res = await axios.post('http://localhost:5000/api/register', {
            username,
            password,
        });
        result = JSON.stringify(res.data);
    }
</script>

<input type="text" bind:value={username}>
<input type="text" bind:value={password}>

<button on:click="{register}">
    Register
</button>

{result}