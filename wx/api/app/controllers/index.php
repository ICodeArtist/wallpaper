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
	public function cjsl(){
		$cj = $_POST['cj'];
		$fg = $_POST['fg'];
		$this->db = db('cjfg');
		$arr = $this->db->where("cj=? and fg=?",array($cj,$fg))->fetch("sl");
		p(json_encode($arr));
	}
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
	public function image(){
		$this->db = db('image');
		$arr = $this->db->where("cate=? and serial=?",array($_POST['cate'],$_POST['serial']))->fetch("offsetX,offsetY,height,width");
		p(json_encode($arr));
	}
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
}
