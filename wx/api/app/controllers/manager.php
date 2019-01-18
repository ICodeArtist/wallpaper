<?php
/*
phpGrace.com 轻快的实力派！
*/
class managerController extends grace{

    public function setbuy(){
        $this->db = db('users');
        $ifexist = $this->db->where("username=?",array(trim($_POST['username'])))->count();
        if($ifexist>0){
            $data['bhf'] = 0;
            $data['qbf'] = 0;
            $data['clf'] = 0;
            $dg = explode(",",$_POST['dg']);
            if(in_array('1',$dg))
                $data['bhf'] = '1';
            if(in_array('2',$dg))
                $data['qbf'] = '1';
            if(in_array('3',$dg))
                $data['clf'] = '1';
            $data['expiredate'] = $_POST['bd']." 23:59:59";
            $this->db->where("username=?",array(trim($_POST['username'])))->update($data);
            $icon = 'success';
            $msg = '成功';
        }else{
            $icon = 'none';
            $msg = '没有该用户';
        }
        $arr['icon'] = $icon;
        $arr['msg'] = $msg;
        p(json_encode($arr));
    }
}