�PNG

   IHDR         A   sRGB ���   gAMA  ���a   PLTE�ǁ�₃�τ�ϩ��������������                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     e��   	pHYs  �  ��o�d   tEXtSoftware Paint.NET v3.5.11G�B7  �IDATx^�ًv�6DQ�ub���E|�P�ks�4�E^] ��k���} U�,D� e��AbPF�A?� e��AbPF�A?� ej���%p�g� @C (1�Ae�d��`P�O1�A��A�����t��0���	� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2?ݠ��z�o�A �hQ�~>ۢom��=Z��٭w��M���>���z'O�]۠�}���wj��� ��q]��k}����o��L͟Ҡ���P�$]����Z�ӾX�[�O���z��w2��nP�9������4ky�G�S��;����4���/�z���n߅j����;i2�ꄴ,�j��	����S;��hPˠZ�j�����I#���4k��>Pen��}6��d�t�A�<|ߧ���C�:�cPF�A?ĠO1���z���4qF���3���8���V;�Gwr������o�w���;���kt�U�j �>c�׏�td̞�����Q���*GjT:Rr��Ψ�%��~��g�pmtF���;�1���Q��y�܅ʡ������^]��׷����S<G����龬�Bӥ1�w:g�Z�rF���z~' �F9ݷ%6O������Ѡ�.6φ.�ΨqN����mO�u��癞�8oS3�@_�ڲ�5�B' md� MP)_���9hߠ�5��R�|�ZO��*O̽Aݩxk�s�<ǎ֘t�Ji��5�4��J& u��ը�VeߠZ�*�}GH�g�����]�[��}U�w�� ��ڛ�;�ؐ<����{�.v_�����z�� �2ݫ��O�//��7-�ع5����tБ]������<-��ϭ1=�O]^���ۉ�������ع�;�V��f�+����{,����/��7��tM]nW�swZ^�:�Z>7�n�w����W���w�s�;ᴓi�u&n��:�ǵ��ǫ ].���)���ܮ��A�W��'{��O�U��ܥ��[vR��N���%P?U3@��p�N��u�}���]��{���������uң�h2�1��V���(��W��t�GG��n���ζ'z����dn�r:��k��a��y'�{ݪ�XZ￸��N���g�+�o�<�no|k`���BF'[�mz+�VV�Ռ�\���ʨ��zߺs4n��ѝ��/�(���mm�|v'M���D=yjHki��������<���"j�V4��V=�?�VLm��Z���s��Y|����N>����t}�(��>�w����* ��t���]�����M�u:��/�r밷��m�J~�+�G�ߍ�H[ �	0�b@ e!� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2��� 1(#����b�2���zK;H#�]    IEND�B`�(function() {
	var timeouts = [];
	var messageName = "zero-timeout-message";

	function setZeroTimeout(fn) {
		timeouts.push(fn);
		window.postMessage(messageName, "*");
	}

	function handleMessage(event) {
		if (event.source == window && event.data == messageName) {
			event.stopPropagation();
			if (timeouts.length > 0) {
				var fn = timeouts.shift();
				fn();
			}
		}
	}

	window.addEventListener("message", handleMessage, true);

	window.setZeroTimeout = setZeroTimeout;
})();

var Neuvol;
var game;
var FPS = 60;
var maxScore=0;

var images = {};

var speed = function(fps){
	FPS = parseInt(fps);
}

var loadImages = function(sources, callback){
	var nb = 0;
	var loaded = 0;
	var imgs = {};
	for(var i in sources){
		nb++;
		imgs[i] = new Image();
		imgs[i].src = sources[i];
		imgs[i].onload = function(){
			loaded++;
			if(loaded == nb){
				callback(imgs);
			}
		}
	}
}

var Bird = function(json){
	this.x = 80;
	this.y = 250;
	this.width = 40;
	this.height = 30;

	this.alive = true;
	this.gravity = 0;
	this.velocity = 0.3;
	this.jump = -6;

	this.init(json);
}

Bird.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Bird.prototype.flap = function(){
	this.gravity = this.jump;
}

Bird.prototype.update = function(){
	this.gravity += this.velocity;
	this.y += this.gravity;
}

Bird.prototype.isDead = function(height, pipes){
	if(this.y >= height || this.y + this.height <= 0){
		return true;
	}
	for(var i in pipes){
		if(!(
			this.x > pipes[i].x + pipes[i].width ||
			this.x + this.width < pipes[i].x || 
			this.y > pipes[i].y + pipes[i].height ||
			this.y + this.height < pipes[i].y
			)){
			return true;
	}
}
}

var Pipe = function(json){
	this.x = 0;
	this.y = 0;
	this.width = 50;
	this.height = 40;
	this.speed = 3;

	this.init(json);
}

Pipe.prototype.init = function(json){
	for(var i in json){
		this[i] = json[i];
	}
}

Pipe.prototype.update = function(){
	this.x -= this.speed;
}

Pipe.prototype.isOut = function(){
	if(this.x + this.width < 0){
		return true;
	}
}

var Game = function(){
	this.pipes = [];
	this.birds = [];
	this.score = 0;
	this.canvas = document.querySelector("#flappy");
	this.ctx = this.canvas.getContext("2d");
	this.width = this.canvas.width;
	this.height = this.canvas.height;
	this.spawnInterval = 90;
	this.interval = 0;
	this.gen = [];
	this.alives = 0;
	this.generation = 0;
	this.backgroundSpeed = 0.5;
	this.backgroundx = 0;
	this.maxScore = 0;
}

Game.prototype.start = function(){
	this.interval = 0;
	this.score = 0;
	this.pipes = [];
	this.birds = [];

	this.gen = Neuvol.nextGeneration();
	for(var i in this.gen){
		var b = new Bird();
		this.birds.push(b)
	}
	this.generation++;
	this.alives = this.birds.length;
}

Game.prototype.update = function(){
	this.backgroundx += this.backgroundSpeed;
	var nextHoll = 0;
	if(this.birds.length > 0){
		for(var i = 0; i < this.pipes.length; i+=2){
			if(this.pipes[i].x + this.pipes[i].width > this.birds[0].x){
				nextHoll = this.pipes[i].height/this.height;
				break;
			}
		}
	}

	for(var i in this.birds){
		if(this.birds[i].alive){

			var inputs = [
			this.birds[i].y / this.height,
			nextHoll
			];

			var res = this.gen[i].compute(inputs);
			if(res > 0.5){
				this.birds[i].flap();
			}

			