<?php
/*
phpGrace.com 轻快的实力派！
*/
class indexController extends grace{

	//__init 函数会在控制器被创建时自动运行用于初始化工作，如果您要使用它，请按照以下格式编写代码即可：
	/*
	public function __init(){
		parent::__init();
		//your code ......
	}
	*/
	public function index(){
		//系统会自动调用视图 index_index.php
	}
	/*******api*******/
	//获取场景+风格的图片数量
	public function cjsl(){
		$cj = $_POST['cj'];
		$fg = $_POST['fg'];
		$this->db = db('cjfg');
		$arr = $this->db->where("cj=? and fg=?",array($cj,$fg))->fetch("sl");
		p(json_encode($arr));
	}
	//获取图片参数
	public function image(){
		$this->db = db('image');
		$arr = $this->db->where("cate=? and serial=?",array($_POST['cate'],$_POST['serial']))->fetch("offsetX,offsetY,height,width");
		p(json_encode($arr));
	}
	//登录ojGCH5KgvBHdnbwZJ4r0NtWtB5rI
	public function login(){
		$username = $_POST['username'];
		$password = $_POST['password'];
		$this->db = db('users');
		//先判断账户密码的正确性
		$userinfo = $this->db->where('username=? and password=?',array($username,md5($password)))->fetch();
		if($userinfo){
			//获取openid
			$code = $_POST['code'];
			$appid = "wxaad4ab73b7b64f99";
			$appsecret = "8236cfb62a37c9c9d33534fb91bd61a8";
			$grant_type = "authorization_code";
			$url='https://api.weixin.qq.com/sns/jscode2session?appid='.$appid.'&secret='.$appsecret.'&js_code='.$code.'&grant_type='.$grant_type;
			$res = json_decode(file_get_contents($url),true);
			if($res['openid']){
				$query = [];
				if($userinfo['openid']){
					//判断绑定的openid是否一致
					if($userinfo['openid'] != $res['openid'])
						$this->json("","201","该账号和绑定微信号不一致");
				}else{
					$userinfo['openid'] = $query['openid'] = $res['openid'];
				}
				$query['IPaddress'] = $this->getClientIp();
				$query['recentlogin'] = date('Y-m-d H:i:s',time());
				$this->upUserInfo($userinfo['id'],$query);
				$this->json($userinfo);
			}else{
				$this->json("","201","网络错误,请重新打开");
			}
		}else{
			$this->json("","201","请输入正确的账号密码");
		}
	}

	public function upUserInfo($uid,$query){
		$this->db = db('users');
		$this->db->where('id=?',array($uid))->update($query);
	}
	/********工具****/
	//抓取图片数据
	public function vrlookshuju(){
		// $this->db = db('image');
		// $url = "https://xcx.vrlook.top/shuju.php";
		// // $post_data['leixing'] = "pm";
		// // $post_data['num'] = 0;
		// for ($i=0; $i <75 ; $i++) {
		// 	$post_data['leixing'] = "pm";
		// 	$post_data['num'] = $i;
		// 	$res = json_decode($this->request_post($url,$post_data),true);
		// 	$res['cate'] = "cate";
		// 	$res['serial'] = $i;
		// 	$this->db->add($res);
		// }
		// p($res);
	}
	//post请求
	public function request_post($url = '', $post_data = array()) {
		if (empty($url) || empty($post_data)) {
		    return false;
		}

		$o = "";
		foreach ( $post_data as $k => $v )
		{
		    $o.= "$k=" . urlencode( $v ). "&" ;
		}
		$post_data = substr($o,0,-1);

		$postUrl = $url;
		$curlPost = $post_data;
		$ch = curl_init();//初始化curl
		curl_setopt($ch, CURLOPT_URL,$postUrl);//抓取指定网页
		curl_setopt($ch, CURLOPT_HEADER, 0);//设置header
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);//要求结果为字符串且输出到屏幕上
		curl_setopt($ch, CURLOPT_TIMEOUT,360);
		curl_setopt($ch, CURLOPT_POST, 1);//post提交方式
		curl_setopt($ch, CURLOPT_POSTFIELDS, $curlPost);
		$data = curl_exec($ch);//运行curl
		curl_close($ch);

		return $data;
	}
	//获取ipp
	public function getClientIp() {
    //strcasecmp 比较两个字符，不区分大小写。返回0，>0，<0。
    if(getenv('HTTP_CLIENT_IP') && strcasecmp(getenv('HTTP_CLIENT_IP'), 'unknown')) {
        $ip = getenv('HTTP_CLIENT_IP');
    } elseif(getenv('HTTP_X_FORWARDED_FOR') && strcasecmp(getenv('HTTP_X_FORWARDED_FOR'), 'unknown')) {
        $ip = getenv('HTTP_X_FORWARDED_FOR');
    } elseif(getenv('REMOTE_ADDR') && strcasecmp(getenv('REMOTE_ADDR'), 'unknown')) {
        $ip = getenv('REMOTE_ADDR');
    } elseif(isset($_SERVER['REMOTE_ADDR']) && $_SERVER['REMOTE_ADDR'] && strcasecmp($_SERVER['REMOTE_ADDR'], 'unknown')) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    $res =  preg_match ( '/[\d\.]{7,15}/', $ip, $matches ) ? $matches [0] : '';
		return $res;
	}
}
