//code to generate & append signUp/signIn form

function createForm(){

	var f = document.createElement('form');
	f.setAttribute('method','post');

	var u = document.createElement('input');
	u.setAttribute('type','text');
	u.setAttribute('name','userName');

	var p = document.createElement('input');
	p.setAttribute('type','text');
	p.setAttribute('name','password');

	f.appendChild(u);
	f.appendChild(p);

	document.getElementById('signUp/In').appendChild(f);
}

<script>
		var signUp = document.getElementById('signUpButton');
		var signIn = document.getElementById('signInButton');

		signUp.addEventListener('click',function({
			alert('you clicked me');
		}))

		signIn.addEventListener('click',function(){
			alert('you clicked me');
		})
</script>
