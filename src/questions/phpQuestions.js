const rawPhpQuestions = [
  {
    id: 1,
    question: "PHP中实现“至少执行一次循环”的结构是？",
    options: { A: "while", B: "do-while", C: "for", D: "foreach" },
    answer: "B"
  },
  {
    id: 2,
    question: "下列哪个不是循环语句？",
    options: { A: "while", B: "do-while", C: "switch", D: "foreach" },
    answer: "C"
  },
  {
    id: 3,
    question: "以下哪个语句用于遍历数组？",
    options: { A: "while", B: "for", C: "foreach", D: "do-while" },
    answer: "C"
  },
  {
    id: 4,
    question: "以下哪个不是流程控制关键字？",
    options: { A: "break", B: "continue", C: "return", D: "echo" },
    answer: "D"
  },
  {
    id: 5,
    question: "以下哪个不是分支结构语句？",
    options: { A: "if", B: "switch", C: "while", D: "elseif" },
    answer: "C"
  },
  {
    id: 6,
    question: "以下哪个不是流程控制结构？",
    options: { A: "顺序结构", B: "数据结构", C: "分支结构", D: "循环结构" },
    answer: "B"
  },
  {
    id: 7,
    question: "以下哪个函数可输出变量类型及值？",
    options: { A: "echo", B: "print", C: "var_dump()", D: "print_r()" },
    answer: "C"
  },
  {
    id: 8,
    question: "以下哪个不是动态网页技术？",
    options: { A: "PHP", B: "ASP.NET", C: "JSP", D: "HTML" },
    answer: "D"
  },
  {
    id: 9,
    question: "以下哪个函数用于输出变量详细信息？",
    options: { A: "var_export()", B: "print_r()", C: "echo()", D: "var_dump()" },
    answer: "B"
  },
  {
    id: 10,
    question: "以下哪个协议用于网页传输？",
    options: { A: "HTTP", B: "FTP", C: "SMTP", D: "POP3" },
    answer: "A"
  },
  {
    id: 11,
    question: "以下哪个不是PHP输出语句？",
    options: { A: "echo", B: "print", C: "printf", D: "scanf" },
    answer: "D"
  },
  {
    id: 12,
    question: "PHP中哪个符号用于连接两个字符串？",
    options: { A: "+", B: ".", C: "&", D: "$" },
    answer: "B"
  },
  {
    id: 13,
    question: "PHP中布尔类型数据只有两个值：",
    options: { A: "true和false", B: "0和1", C: "“true”和“false”", D: "yes和no" },
    answer: "A"
  },
  {
    id: 14,
    question: "以下哪个不是PHP中的基本数据类型？",
    options: { A: "整数", B: "浮点数", C: "字符串", D: "数组" },
    answer: "D"
  },
  {
    id: 15,
    question: "PHP中定义常量的正确方式是？",
    options: { A: "var", B: "define()", C: "const", D: "B和C都可以" },
    answer: "D"
  },
  {
    id: 16,
    question: "PHP中变量名必须以什么符号开头？",
    options: { A: "$", B: "#", C: "@", D: "%" },
    answer: "A"
  },
  {
    id: 17,
    question: "PHP中哪个函数可以获取变量类型？",
    options: { A: "gettype()", B: "var_dump()", C: "print_r()", D: "echo" },
    answer: "A"
  },
  {
    id: 18,
    question: "PHP中字符串的定界符不包括：",
    options: { A: "单引号", B: "双引号", C: "反引号", D: "三引号" },
    answer: "D"
  },
  {
    id: 19,
    question: "PHP中哪个类型转换函数可以将变量转换为布尔型？",
    options: { A: "(bool)", B: "boolean()", C: "settype()", D: "以上都是" },
    answer: "D"
  },
  {
    id: 20,
    question: "以下哪个不是PHP中的比较运算符？",
    options: { A: "==", B: "===", C: "<>", D: "->" },
    answer: "D"
  },
  {
    id: 21,
    question: "PHP中哪个运算符用于检查两个变量是否相等且类型相同？",
    options: { A: "==", B: "!=", C: "===", D: "!==" },
    answer: "C"
  },
  {
    id: 22,
    question: "PHP中字符串连接运算符是？",
    options: { A: "+", B: ".", C: "&", D: "$" },
    answer: "B"
  },
  {
    id: 23,
    question: "PHP中将变量转换为整型的函数是？",
    options: { A: "intval()", B: "floatval()", C: "strval()", D: "boolval()" },
    answer: "A"
  },
  {
    id: 24,
    question: "PHP中自增运算符是？",
    options: { A: "++", B: "--", C: "+=", D: "-=" },
    answer: "A"
  },
  {
    id: 25,
    question: "PHP中哪个运算符用于执行取反操作？",
    options: { A: "!", B: "&&", C: "||", D: "~" },
    answer: "A"
  },
  {
    id: 26,
    question: "PHP中哪个运算符用于执行按位与操作？",
    options: { A: "&", B: "|", C: "~", D: "^" },
    answer: "A"
  },
  {
    id: 27,
    question: "PHP中哪个运算符用于执行按位异或操作？",
    options: { A: "&", B: "|", C: "~", D: "^" },
    answer: "D"
  },
  {
    id: 28,
    question: "创建数组$stus，遍历数组中的元素，下列写法正确的是：",
    options: { A: "for ($i = 1; $i < count($stus); $i++)", B: "foreach($stus in $v)", C: "foreach($stus as $k $v)", D: "foreach($stus as $k => $v)" },
    answer: "D"
  },
  {
    id: 29,
    question: "创建关联数组$me，遍历数组中的元素，下列写法正确的是：",
    options: { A: "foreach($me at $i)", B: "foreach($me as $me[$i])", C: "foreach($me as $i)", D: "for($i=0;$i<count($me) ;$i++)" },
    answer: "C"
  },
  {
    id: 30,
    question: "下列哪个函数不能向数组末尾添加元素？",
    options: { A: "array_push()", B: "$array[] =", C: "array_unshift()", D: "array_merge()" },
    answer: "C"
  },
  {
    id: 31,
    question: "使用哪个函数可以获取数组的所有键名？",
    options: { A: "array_keys()", B: "array_values()", C: "array_flip()", D: "array_search()" },
    answer: "A"
  },
  {
    id: 32,
    question: "以下代码的输出结果是：\n\n$arr = [1, 2, 3];\n\narray_pop($arr);\n\necho count($arr);",
    options: { A: "0", B: "1", C: "2", D: "3" },
    answer: "C"
  },
  {
    id: 33,
    question: "以下代码的输出结果是：\n\n$arr = [\"a\", \"b\", \"c\"];\n\necho current($arr);",
    options: { A: "a", B: "b", C: "c", D: "空值" },
    answer: "A"
  },
  {
    id: 34,
    question: "函数array_search()返回什么类型的结果？",
    options: { A: "布尔值", B: "数组的键名", C: "数组的值", D: "数组长度" },
    answer: "B"
  },
  {
    id: 35,
    question: "如何将数组按值降序排序？",
    options: { A: "sort()", B: "rsort()", C: "asort()", D: "ksort()" },
    answer: "B"
  },
  {
    id: 36,
    question: "函数array_slice()的作用是？",
    options: { A: "截取数组片段", B: "合并数组", C: "删除数组元素", D: "替换数组元素" },
    answer: "A"
  },
  {
    id: 37,
    question: "以下哪个函数可以遍历多维数组？",
    options: { A: "foreach()", B: "for()", C: "while()", D: "do-while()" },
    answer: "A"
  },
  {
    id: 38,
    question: "如何判断一个变量是否是数组？",
    options: { A: "is_array()", B: "is_object()", C: "is_string()", D: "is_numeric()" },
    answer: "A"
  },
  {
    id: 39,
    question: "函数array_pad()的作用是？",
    options: { A: "填充数组到指定长度", B: "合并数组", C: "删除数组元素", D: "反转数组" },
    answer: "A"
  },
  {
    id: 40,
    question: "以下代码的输出结果是：\n\n$arr = [1,2,3];\n\narray_shift($arr);\n\necho $arr[0];",
    options: { A: "1", B: "2", C: "3", D: "空值" },
    answer: "B"
  },
  {
    id: 41,
    question: "在PHP中，用于获取字符串长度的函数是？",
    options: { A: "str_len()", B: "strlen()", C: "length()", D: "get_length()" },
    answer: "B"
  },
  {
    id: 42,
    question: "使用substr(\"Hello\",1,3)会返回什么结果？",
    options: { A: "“Hel”", B: "“ell”", C: "“ello”", D: "“llo”" },
    answer: "B"
  },
  {
    id: 43,
    question: "以下哪个函数用于字符串替换？",
    options: { A: "str_replace()", B: "replace_str()", C: "substitution()", D: "swap_str()" },
    answer: "A"
  },
  {
    id: 44,
    question: "字符串\"PHP is Fun\"和\"php is fun\"使用strcmp()比较的结果是什么？",
    options: { A: "0", B: "正数", C: "负数", D: "1" },
    answer: "B"
  },
  {
    id: 45,
    question: "用于去除字符串首尾空白字符的函数是？",
    options: { A: "trim()", B: "chop()", C: "ltrim()", D: "rtrim()" },
    answer: "A"
  },
  {
    id: 46,
    question: "以下哪个函数能将字符串转换为小写？",
    options: { A: "lower()", B: "strtolower()", C: "tolower()", D: "case_lower()" },
    answer: "B"
  },
  {
    id: 47,
    question: "使用explode(\",\",\"a,b,c\")会得到什么结果？",
    options: { A: "数组array('a', 'b', 'c')", B: "字符串“abc”", C: "数组array('a, 'b, ', 'c')", D: "错误" },
    answer: "A"
  },
  {
    id: 48,
    question: "用于查找字符串首次出现位置的函数是？",
    options: { A: "strpos()", B: "findstr()", C: "indexof()", D: "search()" },
    answer: "A"
  },
  {
    id: 49,
    question: "使用str_pad(\"Hi\", 5, \"!\")会返回什么？",
    options: { A: "“Hi!!!”", B: "“!!!!Hi”", C: "“Hi!...”", D: "“Hi!!!”" },
    answer: "A"
  },
  {
    id: 50,
    question: "以下哪个函数用于字符串连接？",
    options: { A: "join()", B: "concat()", C: ".运算符", D: "merge()" },
    answer: "C"
  },
  {
    id: 51,
    question: "PHP中用于计算平方根的函数是？",
    options: { A: "sqrt()", B: "pow()", C: "exp()", D: "log()" },
    answer: "A"
  },
  {
    id: 52,
    question: "以下哪个函数用于生成更安全的随机数？",
    options: { A: "rand()", B: "mt_rand()", C: "random_int()", D: "range()" },
    answer: "C"
  },
  {
    id: 53,
    question: "将字符串“2025-04-15”转为时间戳应使用：",
    options: { A: "date()", B: "strtotime()", C: "time()", D: "getdate()" },
    answer: "B"
  },
  {
    id: 54,
    question: "以下哪个不是变量处理函数？",
    options: { A: "isset()", B: "empty()", C: "unset()", D: "var_dump()" },
    answer: "D"
  },
  {
    id: 55,
    question: "以下哪个函数用于计算数组元素和？",
    options: { A: "count()", B: "array_sum()", C: "sum()", D: "array_reduce()" },
    answer: "B"
  },
  {
    id: 56,
    question: "以下哪个函数用于获取脚本执行时间？",
    options: { A: "microtime()", B: "time()", C: "date()", D: "getdate()" },
    answer: "A"
  },
  {
    id: 57,
    question: "PHP自定义函数的核心要素不包括：",
    options: { A: "function关键字", B: "访问修饰符", C: "参数列表", D: "函数体" },
    answer: "B"
  },
  {
    id: 58,
    question: "在PHP中，如何获取通过POST方法提交的表单数据？",
    options: { A: "$_post[]", B: "$_POST[]", C: "$_get", D: "$_POST" },
    answer: "B"
  },
  {
    id: 59,
    question: "Cookie技术主要用于在客户端存储什么类型的数据？",
    options: { A: "结构化数据", B: "非结构化数据", C: "临时数据", D: "永久数据" },
    answer: "C"
  },
  {
    id: 60,
    question: "以下哪个选项正确描述了Cookie和Session的区别？",
    options: { A: "Cookie存储在客户端，Session存储在服务器端", B: "Cookie存储在服务器端，Session存储在客户端", C: "Cookie和Session都存储在客户端", D: "Cookie和Session都存储在服务器端" },
    answer: "A"
  },
  {
    id: 61,
    question: "在PHP中，以下哪个函数用于设置Cookie？",
    options: { A: "setcookie()", B: "setSession()", C: "COOKIE[]", D: "SESSION" },
    answer: "A"
  },
  {
    id: 62,
    question: "在PHP中，以下哪个函数用于启动Session？",
    options: { A: "session_start()", B: "cookie_start", C: "SESSION", D: "COOKIE" },
    answer: "A"
  },
  {
    id: 63,
    question: "以下哪个选项正确描述了Session的工作过程？",
    options: { A: "session数据存储在客户端，通过Cookie传递Session", B: "session数据存储在服务器端，通过Cookie传递Session", C: "session数据存储在客户端，通过URL传递Session", D: "session数据存储在服务器端，通过URL传递Session" },
    answer: "B"
  },
  {
    id: 64,
    question: "在PHP中，以下哪个选项用于获取Session？",
    options: { A: "session_", B: "SESSION[\"\"]", C: "COOKIE['PHPSESS']", D: "$_SESSION[]" },
    answer: "D"
  },
  {
    id: 65,
    question: "PHP中使用mysqli_query()执行SQL时，返回结果集的操作是：",
    options: { A: "SELECT查询", B: "INSERT插入", C: "UPDATE更新", D: "DELETE删除" },
    answer: "A"
  },
  {
    id: 66,
    question: "PHP中用于连接MySQL数据库的函数是：",
    options: { A: "mysqli_connect()", B: "mysqli_query()", C: "mysqli_fetch_assoc()", D: "mysqli_close()" },
    answer: "A"
  },
  {
    id: 67,
    question: "以下哪个函数用于执行MySQL查询并返回结果集？",
    options: { A: "mysqli_connect()", B: "mysqli_query()", C: "mysqli_fetch_assoc()", D: "mysqli_close()" },
    answer: "B"
  },
  {
    id: 68,
    question: "mysqli_fetch_row()函数返回的结果类型是：",
    options: { A: "关联数组", B: "索引数组", C: "对象", D: "JSON字符串" },
    answer: "B"
  },
  {
    id: 69,
    question: "mysqli_fetch_all()函数默认返回的结果类型是：",
    options: { A: "关联数组", B: "索引数组", C: "对象数组", D: "混合数组" },
    answer: "D"
  },
  {
    id: 70,
    question: "以下哪个函数用于获取结果集总行数？",
    options: { A: "mysqli_num_rows()", B: "mysqli_affected_rows()", C: "mysqli_insert_id()", D: "mysqli_field_count()" },
    answer: "A"
  },
  {
    id: 71,
    question: "以下哪个函数用于获取结果集字段长度？",
    options: { A: "mysqli_fetch_field_length()", B: "mysqli_fetch_field_type()", C: "mysqli_fetch_field_flags()", D: "mysqli_fetch_field_name()" },
    answer: "C"
  },
  {
    id: 72,
    question: "在PHP中，用于遍历目录的函数是？",
    options: { A: "readdir()", B: "scandir()", C: "dir()", D: "opendir()" },
    answer: "B"
  },
  {
    id: 73,
    question: "以下哪个函数用于获取目录句柄？",
    options: { A: "scandir()", B: "opendir()", C: "readdir()", D: "closedir()" },
    answer: "B"
  },
  {
    id: 74,
    question: "使用目录句柄遍历目录的正确流程是？",
    options: { A: "opendir() → readdir() → closedir()", B: "scandir() → foreach → 处理文件", C: "直接调用readdir()即可", D: "不需要关闭目录句柄" },
    answer: "A"
  },
  {
    id: 75,
    question: "以下哪个函数用于关闭目录句柄？",
    options: { A: "closedir()", B: "close_dir()", C: "dir_close()", D: "无需关闭" },
    answer: "A"
  },
  {
    id: 76,
    question: "scandir()函数返回的是什么类型的数据？",
    options: { A: "数组", B: "字符串", C: "对象", D: "布尔值" },
    answer: "A"
  },
  {
    id: 77,
    question: "在遍历目录时，如何排除“.”和“..”这两个特殊目录？",
    options: { A: "使用array_filter()过滤", B: "在循环中判断并跳过", C: "scandir()自动排除", D: "无法排除" },
    answer: "B"
  },
  {
    id: 78,
    question: "以下哪个函数可以获取文件的完整路径信息？",
    options: { A: "pathinfo()", B: "basename()", C: "dirname()", D: "realpath()" },
    answer: "D"
  },
  {
    id: 79,
    question: "以下哪个函数用于获取目录的绝对路径？",
    options: { A: "realpath()", B: "abspath()", C: "get_absolute_path()", D: "没有这样的函数" },
    answer: "A"
  },
  {
    id: 80,
    question: "在PHP中，如何判断一个路径是否是目录？",
    options: { A: "is_dir()", B: "is_file()", C: "is_path()", D: "is_directory()" },
    answer: "A"
  },
  {
    id: 81,
    question: "在PHP中，用于打开文件的函数是？",
    options: { A: "fopen()", B: "open_file()", C: "file_open()", D: "start_file()" },
    answer: "A"
  },
  {
    id: 82,
    question: "以下哪个模式表示以只读方式打开文件？",
    options: { A: "'r'", B: "'w'", C: "'a'", D: "'x'" },
    answer: "A"
  },
  {
    id: 83,
    question: "使用fopen()函数打开文件后，如何读取文件内容？",
    options: { A: "fread()", B: "read_file()", C: "file_read()", D: "get_content()" },
    answer: "A"
  },
  {
    id: 84,
    question: "以下哪个函数用于将内容写入文件？",
    options: { A: "fwrite()", B: "write_file()", C: "file_write()", D: "put_content()" },
    answer: "A"
  },
  {
    id: 85,
    question: "在PHP中，如何关闭已打开的文件？",
    options: { A: "fclose()", B: "close_file()", C: "file_close()", D: "end_file()" },
    answer: "A"
  },
  {
    id: 86,
    question: "在PHP中，如何获取文件的大小？",
    options: { A: "filesize()", B: "get_size()", C: "file_size()", D: "measure_file()" },
    answer: "A"
  },
  {
    id: 87,
    question: "在PHP中，如何实现文件上传？",
    options: { A: "使用$_FILES超全局数组", B: "使用file_upload()函数", C: "使用upload_file()函数", D: "无法直接实现" },
    answer: "A"
  },
  {
    id: 88,
    question: "以下哪个函数可以移动上传的文件？",
    options: { A: "move_uploaded_file()", B: "move_file()", C: "transfer_file()", D: "upload_move()" },
    answer: "A"
  },
  {
    id: 89,
    question: "以下哪个属性用于指定表单提交的目标地址？",
    options: { A: "method", B: "action", C: "name", D: "id" },
    answer: "B"
  },
  {
    id: 90,
    question: "PHP条件控制结构包括（）。",
    options: { A: "if单分支", B: "if-else双分支", C: "elseif多分支", D: "switch多分支" },
    answer: "ABCD"
  },
  {
    id: 91,
    question: "switch语句结构包含（）。",
    options: { A: "case分支", B: "default默认分支", C: "break退出语句", D: "continue语句" },
    answer: "ABC"
  },
  {
    id: 92,
    question: "PHP流程控制分类包括（）。",
    options: { A: "顺序结构", B: "分支结构", C: "循环结构", D: "数据结构" },
    answer: "ABC"
  },
  {
    id: 93,
    question: "PHP循环语句包括（）。",
    options: { A: "while", B: "do-while", C: "for", D: "foreach" },
    answer: "ABCD"
  },
  {
    id: 94,
    question: "PHP中的跳转语句包括（）。",
    options: { A: "break", B: "continue", C: "goto", D: "return" },
    answer: "ABCD"
  },
  {
    id: 95,
    question: "PHP的特性包括（）。",
    options: { A: "服务器端执行", B: "跨平台兼容", C: "开源免费", D: "面向对象" },
    answer: "ABCD"
  },
  {
    id: 96,
    question: "PHP注释符包括（）。",
    options: { A: "//", B: "/**/", C: "#"},
    answer: "ABC"
  },
  {
    id: 97,
    question: "PHP开发环境要素包括（）。",
    options: { A: "Web服务器", B: "数据库", C: "PHP解析器", D: "文本编辑器" },
    answer: "ABCD"
  },
  {
    id: 98,
    question: "PHP变量命名规则包括（ ）。",
    options: { A: "以$开头", B: "区分大小写", C: "可包含数字", D: "不可有空格" },
    answer: "ABCD"
  },
  {
    id: 99,
    question: "以下哪些属于PHP中的复合数据类型？",
    options: { A: "数组", B: "对象", C: "资源", D: "字符串" },
    answer: "ABC"
  },
  {
    id: 100,
    question: "PHP中哪些情况下变量会被自动转换为字符串？",
    options: { A: "使用echo输出时", B: "进行字符串连接时", C: "进行数学运算时", D: "进行比较运算时" },
    answer: "AB"
  },
  {
    id: 101,
    question: "PHP中哪些方式可以定义常量？",
    options: { A: "define()", B: "const", C: "var", D: "$" },
    answer: "AB"
  },
  {
    id: 102,
    question: "PHP中哪些数据类型属于标量类型？",
    options: { A: "整数", B: "浮点数", C: "字符串", D: "布尔" },
    answer: "ABCD"
  },
  {
    id: 103,
    question: "PHP中的运算符包括哪些类型？",
    options: { A: "算术运算符", B: "比较运算符", C: "逻辑运算符", D: "赋值运算符" },
    answer: "ABCD"
  },
  {
    id: 104,
    question: "PHP中哪些方式可以实现类型转换？",
    options: { A: "(int)", B: "intval()", C: "settype()", D: "strval()" },
    answer: "ABCD"
  },
  {
    id: 105,
    question: "PHP中哪些运算符属于逻辑运算符？",
    options: { A: "&&", B: "||", C: "!", D: "==" },
    answer: "ABC"
  },
  {
    id: 106,
    question: "PHP中哪些运算符属于比较运算符？",
    options: { A: "==", B: "===", C: "!=", D: "<>" },
    answer: "ABCD"
  },
  {
    id: 107,
    question: "PHP中哪些运算符属于算术运算符？",
    options: { A: "+", B: "-", C: "*", D: "/" },
    answer: "ABCD"
  },
  {
    id: 108,
    question: "以下说法不正确的是",
    options: { A: "$attr代表数组,那么数组长度可以通过$attr.length取到", B: "unset()方法不能删除数组里面的某个元素", C: "php的数组里面可以存储任意类型的数据", D: "php里面只有索引数组" },
    answer: "ABD"
  },
  {
    id: 109,
    question: "以下哪些函数会修改原数组？",
    options: { A: "array_push()", B: "array_pop()", C: "array_slice()", D: "array_merge()" },
    answer: "AB"
  },
  {
    id: 110,
    question: "以下哪些函数用于数组排序？",
    options: { A: "sort()", B: "asort()", C: "ksort()", D: "shuffle()" },
    answer: "ABC"
  },
  {
    id: 111,
    question: "以下哪些函数可以遍历数组？",
    options: { A: "foreach()", B: "for()", C: "while(list()=each())", D: "do-while()" },
    answer: "ABC"
  },
  {
    id: 112,
    question: "以下哪些函数用于数组搜索？",
    options: { A: "in_array()", B: "array_search()", C: "array_key_exists()", D: "isset()" },
    answer: "ABC"
  },
  {
    id: 113,
    question: "以下哪些函数属于字符串截取类函数？",
    options: { A: "substr()", B: "strpos()", C: "mb_substr()", D: "substr_replace()" },
    answer: "ACD"
  },
  {
    id: 114,
    question: "PHP数学函数包含（）。",
    options: { A: "ceil()", B: "floor()", C: "round()", D: "abs()" },
    answer: "ABCD"
  },
  {
    id: 115,
    question: "PHP日期时间函数包括（）。",
    options: { A: "date()", B: "time()", C: "strtotime()", D: "getdate()" },
    answer: "ABCD"
  },
  {
    id: 116,
    question: "PHP变量函数使用方式包括（）。",
    options: { A: "直接调用$func()", B: "call_user_func()", C: "可变类名实例化", D: "以上都是" },
    answer: "ABCD"
  },
  {
    id: 117,
    question: "PHP类型转换函数包括（）。",
    options: { A: "intval()", B: "floatval()", C: "strval()", D: "boolval()" },
    answer: "ABCD"
  },
  {
    id: 118,
    question: "PHP中日期格式化字符包括（）。",
    options: { A: "Y(四位年份)", B: "m(月份)", C: "d(日期)", D: "H(24小时制)" },
    answer: "ABCD"
  },
  {
    id: 119,
    question: "PHP支持哪些函数参数传递方式？",
    options: { A: "值传递", B: "引用传递", C: "可变数量参数", D: "类型声明" },
    answer: "ABCD"
  },
  {
    id: 120,
    question: "PHP函数返回值类型可以是：",
    options: { A: "标量类型", B: "数组", C: "对象", D: "资源" },
    answer: "ABCD"
  },
  {
    id: 121,
    question: "PHP函数作用域规则包括：",
    options: { A: "函数内部可访问全局变量需用global声明", B: "静态变量使用static关键字声明", C: "局部变量仅在函数执行期间存在", D: "超全局变量在函数内可直接访问" },
    answer: "ABCD"
  },
  {
    id: 122,
    question: "PHP函数高级特性包括：",
    options: { A: "类型声明", B: "返回值类型声明", C: "生成器函数", D: "可变参数函数" },
    answer: "ABCD"
  },
  {
    id: 123,
    question: "PHP操作MySQL数据库的核心步骤包括：",
    options: { A: "建立数据库连接", B: "执行SQL语句", C: "处理结果集", D: "关闭数据库连接" },
    answer: "ABCD"
  },
  {
    id: 124,
    question: "PHP中处理结果集时常见的错误类型包括：",
    options: { A: "未选择数据库", B: "SQL语法错误", C: "结果集为空", D: "内存不足" },
    answer: "ABC"
  },
  {
    id: 125,
    question: "以下哪些函数可以获取MySQL查询结果？",
    options: { A: "mysqli_fetch_assoc()", B: "mysqli_fetch_array()", C: "mysqli_fetch_object()", D: "mysqli_fetch_row()" },
    answer: "ABCD"
  },
  {
    id: 126,
    question: "PHP中处理结果集时需要注意：",
    options: { A: "及时释放结果集内存", B: "检查查询是否执行成功", C: "遍历结果集前确认有数据", D: "无需处理特殊字符" },
    answer: "ABC"
  },
  {
    id: 127,
    question: "PHP中处理结果集时常用的循环结构有：",
    options: { A: "while循环", B: "for循环", C: "foreach循环", D: "do-while循环" },
    answer: "ABC"
  },
  {
    id: 128,
    question: "pathinfo()函数返回的数组中包含哪些信息？",
    options: { A: "目录名", B: "文件名", C: "扩展名", D: "文件大小" },
    answer: "ABC"
  },
  {
    id: 129,
    question: "以下哪些函数属于目录操作函数？",
    options: { A: "scandir()", B: "opendir()", C: "readdir()", D: "closedir()" },
    answer: "ABCD"
  },
  {
    id: 130,
    question: "以下哪些函数可以获取文件路径信息？",
    options: { A: "pathinfo()", B: "basename()", C: "dirname()", D: "realpath()" },
    answer: "ABCD"
  },
  {
    id: 131,
    question: "在遍历目录时，可能需要处理哪些特殊情况？",
    options: { A: "隐藏文件", B: "系统文件", C: "符号链接", D: "特殊权限文件" },
    answer: "ABCD"
  },
  {
    id: 132,
    question: "以下哪些函数可以判断文件类型？",
    options: { A: "is_dir()", B: "is_file()", C: "is_path()", D: "is_executable()" },
    answer: "AB"
  },
  {
    id: 133,
    question: "目录操作在实际开发中的应用场景有哪些？",
    options: { A: "文件管理", B: "日志记录", C: "缓存处理", D: "资源加载" },
    answer: "ABCD"
  },
  {
    id: 134,
    question: "以下哪些函数可以创建或删除目录？",
    options: { A: "mkdir()", B: "rmdir()", C: "scandir()", D: "opendir()" },
    answer: "AB"
  },
  {
    id: 135,
    question: "以下哪些函数属于文件操作函数？",
    options: { A: "fopen()", B: "fread()", C: "fwrite()", D: "fclose()" },
    answer: "ABCD"
  },
  {
    id: 136,
    question: "以下哪些模式可以用于打开文件？",
    options: { A: "'r'（只读）", B: "'w'（写入）", C: "'a'（追加）", D: "'x'（创建并写入）" },
    answer: "ABCD"
  },
  {
    id: 137,
    question: "以下哪些函数可以用于文件内容处理？",
    options: { A: "file_get_contents()", B: "file_put_contents()", C: "file()", D: "readfile()" },
    answer: "ABCD"
  },
  {
    id: 138,
    question: "HTTP协议的主要特点有哪些？",
    options: { A: "无状态", B: "基于请求-响应模型", C: "支持多种媒体类型", D: "简单灵活" },
    answer: "ABCD"
  },
  {
    id: 139,
    question: "HTTPS协议相比HTTP协议有哪些优势？",
    options: { A: "更高的安全性", B: "数据加密传输", C: "身份验证", D: "防止篡改" },
    answer: "ABCD"
  },
  {
    id: 140,
    question: "HTTP请求报文由哪些部分组成？",
    options: { A: "请求行", B: "请求头", C: "请求体", D: "状态行" },
    answer: "ABC"
  },
  {
    id: 141,
    question: "HTTP响应报文由哪些部分组成？",
    options: { A: "状态行", B: "响应头", C: "响应体", D: "请求行" },
    answer: "ABC"
  },
  {
    id: 142,
    question: "常见的HTTP状态码有哪些？",
    options: { A: "200 OK", B: "404 Not Found", C: "500 Internal Server Error", D: "301 Moved Permanently", E: "302 Found" },
    answer: "ABCDE"
  },
  {
    id: 143,
    question: "switch语句每个case必须带break。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 144,
    question: "continue语句会终止整个循环。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 145,
    question: "return只能用于函数中返回值。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 146,
    question: "foreach循环可以遍历关联数组。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 147,
    question: "PHP是客户端脚本语言。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 148,
    question: "Apache服务器默认主目录是www。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 149,
    question: "var_dump()只能输出变量值。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 150,
    question: "动态网页必须包含数据库操作。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 151,
    question: "PHP只能在Apache服务器运行。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 152,
    question: "PHP配置文件可设置上传文件大小限制。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 153,
    question: "所有PHP文件必须有.php扩展名。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 154,
    question: "PHP中变量使用前必须声明类型。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 155,
    question: "PHP中字符串只能用双引号定义。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 156,
    question: "PHP中常量的值一旦定义后不可更改。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 157,
    question: "PHP中变量名区分大小写。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 158,
    question: "PHP中所有数据类型都可以相互转换。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 159,
    question: "PHP中的类型转换是隐式的，不需要显式指定。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 160,
    question: "PHP中的运算符优先级与数学中的运算符优先级完全相同。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 161,
    question: "PHP中的自增运算符++可以用于字符串类型的变量。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 162,
    question: "PHP中的比较运算符==和===的区别在于===还比较类型。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 163,
    question: "使用substr_replace(\"ABCDEF\", \"123\", 2, 3)会得到\"AB123F\"。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 164,
    question: "strcmp()区分大小写，而strcasecmp()不区分。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 165,
    question: "explode()和implode()是互为逆操作的函数。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 166,
    question: "使用trim(\"PHP\")会返回\"PHP\"(首尾空格被删除)。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 167,
    question: "str_repeat(\"a\", 3)返回\"aaa\"。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 168,
    question: "max()函数只能比较数字大小。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 169,
    question: "date()函数必须传入时间戳参数。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 170,
    question: "microtime()返回包含微秒的时间。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 171,
    question: "gettype()函数用于检测变量类型。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 172,
    question: "mt_rand()比rand()生成随机数更快。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 173,
    question: "date()函数默认使用服务器时区。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 174,
    question: "PHP函数名必须遵循$开头的命名规则。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 175,
    question: "PHP允许在函数内部定义同名函数。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 176,
    question: "PHP函数参数默认值必须是常量表达式。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 177,
    question: "PHP允许函数返回自身（递归调用）。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 178,
    question: "PHP函数内部定义的变量默认是全局变量。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 179,
    question: "PHP允许函数参数默认值为数组。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 180,
    question: "每个MySQL用户必须具有全局作用域权限。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 181,
    question: "主键约束允许字段值为NULL。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 182,
    question: "MySQL默认使用的超级管理员账号是root。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 183,
    question: "mysqli_fetch_assoc()函数返回的是索引数组。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 184,
    question: "预处理语句能有效防止SQL注入攻击。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 185,
    question: "mysqli_fetch_assoc()函数返回的是关联数组。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 186,
    question: "mysqli_fetch_array()默认返回关联数组。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 187,
    question: "mysqli_fetch_all()可以一次性获取所有结果集数据。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 188,
    question: "scandir()函数只能遍历当前工作目录下的文件。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 189,
    question: "使用目录句柄遍历目录时，必须手动关闭目录句柄。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 190,
    question: "在遍历目录时，“.”代表当前目录，“..”代表上级目录。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 191,
    question: "pathinfo()函数可以获取文件的扩展名。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 192,
    question: "realpath()函数可以解析符号链接。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 193,
    question: "is_dir()函数可以判断一个路径是否是目录。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 194,
    question: "scandir()函数返回的数组中不包含“.”和“..”目录。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 195,
    question: "在遍历目录时，必须按照特定的顺序处理文件。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 196,
    question: "使用目录句柄遍历目录时，可以获取文件的详细信息。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 197,
    question: "在PHP中，无法获取目录的创建时间。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 198,
    question: "文件操作必须按照打开、读写、关闭的顺序进行。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 199,
    question: "使用fopen()函数打开文件时，如果文件不存在会自动创建。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 200,
    question: "在写入文件时，'w'模式会覆盖原有内容，而'a'模式会在文件末尾追加内容。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 201,
    question: "使用file_exists()函数可以检查目录是否存在。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 202,
    question: "在PHP中，无法获取文件的创建时间。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 203,
    question: "使用move_uploaded_file()函数时，目标文件必须已经存在。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 204,
    question: "文件上传时，表单的enctype属性必须设置为multipart/form-data。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 205,
    question: "在PHP中，可以同时对多个文件进行读写操作。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 206,
    question: "在PHP中，无法对文件进行锁定操作。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 207,
    question: "HTTP协议是无状态协议，即每个请求都是独立的。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 208,
    question: "在HTTP请求报文中，请求头用于传递客户端的附加信息。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 209,
    question: "HTTP状态码分为1xx、2xx、3xx、4xx、5xx五大类。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 210,
    question: "在HTTP响应头中，Content-Type头字段用于指定响应内容的媒体类型。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 211,
    question: "HTTP协议支持持久连接，即多个请求可以复用同一个TCP连接。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 212,
    question: "HTTPS协议需要SSL/TLS证书来加密传输数据。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 213,
    question: "在HTTP请求报文中，请求体用于传递客户端提交的数据。",
    options: { A: "正确", B: "错误" },
    answer: "A"
  },
  {
    id: 214,
    question: "mysqli_fetch_assoc()函数返回的是索引数组。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  },
  {
    id: 215,
    question: "mysqli_fetch_array()默认返回关联数组。",
    options: { A: "正确", B: "错误" },
    answer: "B"
  }

];
export default rawPhpQuestions;



