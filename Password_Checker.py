import requests
import hashlib
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def password_frontend():
	return render_template('Password.html')


@app.route("/check_password",methods=['GET', 'POST'])
def check_password():
	password = requests.get('password')
	count = pwned_api_check(password)

	if count:
		result = f'{password} was found {count} times... you should change your password'
	else:
		result = f'{password} was NOT found.'
	print(result)
	return render_template('Password.html', result=result)

def request_api_data(query_char):
	url = 'https://api.pwnedpasswords.com/range/' + query_char
	res = requests.get(url)
	if res.status_code != 200:
		raise RuntimeError (f'Error fetching: {res.status_code}, check API and try again.')
	return res

def get_password_leaks_count(hashes, hash_to_check):
	hashes = (line.split(':') for line in hashes.text.splitlines())
	for h, count in hashes:
		if h == hash_to_check:
			return count
	return 0

def pwned_api_check(password):
	sha1password = hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
	first_5letters, tail = sha1password[:5], sha1password[5:]
	response = request_api_data(first_5letters)
	return get_password_leaks_count(response,tail)


if __name__ == '__main__':
	app.run(port=5002)
