/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Uki by Charles Childers

 This is a framework for interfacing Retro and JavaScript.

 Uki is gifted to the public domain. Share freely.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Global Limits
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const IMAGE_SIZE  = 5000000
  const STACK_DEPTH =     100
  const CYCLES_PER  =     100



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Opcodes for the VM
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  const VM_NOP = 0;       const VM_LIT = 1;         const VM_DUP = 2;
  const VM_DROP = 3;      const VM_SWAP = 4;        const VM_PUSH = 5;
  const VM_POP = 6;       const VM_CALL = 7;        const VM_JUMP = 8;
  const VM_RETURN = 9;    const VM_GT_JUMP = 10;    const VM_LT_JUMP = 11;
  const VM_NE_JUMP = 12;  const VM_EQ_JUMP = 13;    const VM_FETCH = 14;
  const VM_STORE = 15;    const VM_ADD = 16;        const VM_SUB = 17;
  const VM_MUL = 18;      const VM_DIVMOD = 19;     const VM_AND = 20;
  const VM_OR = 21;       const VM_XOR = 22;        const VM_SHL = 23;
  const VM_SHR = 24;      const VM_ZERO_EXIT = 25;  const VM_INC = 26;
  const VM_DEC = 27;      const VM_IN = 28;         const VM_OUT = 29;
  const VM_WAIT = 30;



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 The core Uki object

 Call uki_start() *before* using Uki objects.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Variables:
    ip                        Instuction pointer
    sp                        Data stack pointer
    rsp                       Return stack pointer
    tib                       Text input buffer
    tob                       Text output buffer
    data                      Data stack (array)
    address                   Return stack (array)
    ports                     I/O ports (array)
    run                       Internal flag
    tos                       Top data stack item
    nos                       Second data stack item

 Functions:
    eval(string)              Evaluate a string
    opcode()                  Process a single opcode
    io()                      Handle I/O devices
    getHeapPointer()          Get the heap pointer
    getDictPointer()          Get the dictionary pointer
    getStrTablePointer()      Get the pointer to the string table
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function uki()
{
  this.ip  = 0;
  this.sp  = 0;
  this.rsp = 0;

  this.tib = '';
  this.tob = '';

  this.data = new Array(STACK_DEPTH);
  this.address = new Array(STACK_DEPTH);
  this.ports = new Array(1024);

  this.ports[0] = 0;
  this.data[0] = 0;

  this.run = 0;

  this.io = function()
  {
    if (this.ports[0] == 1)
      return;

    /* Input */
    if (this.ports[0] == 0 && this.ports[1] == 1)
    {
      this.ports[0] = 1;
      this.ports[1] = this.tib.charCodeAt(0);
      this.tib = this.tib.substring(1, this.tib.length);
    }

    /* Output */
    if (this.ports[2] == 1)
    {
      var ch = String.fromCharCode(this.data[this.sp]);
      this.tob += ch;
      if (this.data[this.sp] == -1)
        this.tob = '';
      this.sp--;
      this.ports[2] = 0;
      this.ports[0] = 1;
    }

    /* Capabilities */
    if (this.ports[5] == -1)
    {
      this.ports[5] = 5000000;
      this.ports[0] = 1;
    }
    if (this.ports[5] == -2 || this.ports[5] == -3 || this.ports[5] == -4)
    {
      this.ports[5] = 0;
      this.ports[0] = 1;
    }
    if (this.ports[5] == -5)
    {
      this.ports[5] = this.sp;
      this.ports[0] = 1;
    }
    if (this.ports[5] == -6)
    {
      this.ports[5] = this.rsp;
      this.ports[0] = 1;
    }
  }


  this.opcode = function()
  {
    var x, y, z, op;
    op = image[this.ip];
    switch(op)
    {
      case VM_NOP:
        break;
      case VM_LIT:
        this.sp++; this.ip++; this.data[this.sp] = image[this.ip];
        break;
      case VM_DUP:
        this.sp++; this.data[this.sp] = this.data[this.sp-1];
        break;
      case VM_DROP:
        this.data[this.sp] = 0; this.sp--;
        break;
      case VM_SWAP:
        x = this.data[this.sp];
        y = this.data[this.sp-1];
        this.data[this.sp] = y;
        this.data[this.sp-1] = x;
        break;
      case VM_PUSH:
        this.rsp++;
        this.address[this.rsp] = this.data[this.sp];
        this.sp--;
        break;
      case VM_POP:
        this.sp++;
        this.data[this.sp] = this.address[this.rsp];
        this.rsp--;
        break;
      case VM_CALL:
        this.ip++; this.rsp++;
        this.address[this.rsp] = this.ip++;
        this.ip = image[this.ip-1] - 1;
        break;
      case VM_JUMP:
        this.ip++;
        this.ip = image[this.ip] - 1;
        break;
      case VM_RETURN:
        this.ip = this.address[this.rsp]; this.rsp--;
        break;
      case VM_GT_JUMP:
        this.ip++
        if (this.data[this.sp-1] > this.data[this.sp])
          this.ip = image[this.ip] - 1;
        this.sp = this.sp - 2;
      break;
      case VM_LT_JUMP:
        this.ip++
        if (this.data[this.sp-1] < this.data[this.sp])
          this.ip = image[this.ip] - 1;
        this.sp = this.sp - 2;
        break;
      case VM_NE_JUMP:
        this.ip++
        if (this.data[this.sp-1] != this.data[this.sp])
          this.ip = image[this.ip] - 1;
        this.sp = this.sp - 2;
        break;
      case VM_EQ_JUMP:
        this.ip++
        if (this.data[this.sp-1] == this.data[this.sp])
          this.ip = image[this.ip] - 1;
        this.sp = this.sp - 2;
        break;
      case VM_FETCH:
        x = this.data[this.sp];
        this.data[this.sp] = image[x];
        break;
      case VM_STORE:
        image[this.data[this.sp]] = this.data[this.sp-1];
        this.sp = this.sp - 2;
        break;
      case VM_ADD:
        this.data[this.sp-1] += this.data[this.sp]; this.data[this.sp] = 0; this.sp--;
        break;
      case VM_SUB:
        this.data[this.sp-1] -= this.data[this.sp]; this.data[this.sp] = 0; this.sp--;
        break;
      case VM_MUL:
        this.data[this.sp-1] *= this.data[this.sp]; this.data[this.sp] = 0; this.sp--;
        break;
      case VM_DIVMOD:
        x = this.data[this.sp];
        y = this.data[this.sp-1];
        this.data[this.sp] = Math.floor(y / x);
        this.data[this.sp-1] = y % x;
        break;
      case VM_AND:
        x = this.data[this.sp];
        y = this.data[this.sp-1];
        this.sp--;
        this.data[this.sp] = x & y;
        break;
      case VM_OR:
        x = this.data[this.sp];
        y = this.data[this.sp-1];
        this.sp--;
        this.data[this.sp] = x | y;
        break;
      case VM_XOR:
        x = this.data[this.sp];
        y = this.data[this.sp-1];
        this.sp--;
        this.data[this.sp] = x ^ y;
        break;
      case VM_SHL:
        x = this.data[this.sp];
        y = this.data[this.sp-1];
        this.sp--;
        this.data[this.sp] = y << x;
        break;
      case VM_SHR:
        x = this.data[this.sp];
        y = this.data[this.sp-1];
        this.sp--;
        this.data[this.sp] = y >>= x;
        break;
      case VM_ZERO_EXIT:
        if (this.data[this.sp] == 0)
        {
          this.sp--;
          this.ip = this.address[this.rsp]; this.rsp--;
        }
        break;
      case VM_INC:
        this.data[this.sp]++;
        break;
      case VM_DEC:
        this.data[this.sp]--;
        break;
      case VM_IN:
        x = this.data[this.sp];
        this.data[this.sp] = this.ports[x];
        this.ports[x] = 0;
        break;
      case VM_OUT:
        this.ports[0] = 0;
        this.ports[this.data[this.sp]] = this.data[this.sp-1];
        this.sp = this.sp - 2;
        break;
      case VM_WAIT:
        this.io();
        break;
      default:
        this.ip = IMAGE_SIZE;
    }

    this.tos = this.data[this.sp];
    this.nos = this.data[this.sp-1];
  }


  this.eval = function(code)
  {
    if (code.length <= 0)
      return '';

    this.run = 1;

    this.tib = ' ' + code + '  ';

    document.getElementById('wait').style.display = "block";

    for (;this.ip < IMAGE_SIZE-1 && this.run == 1;)
    {
      this.opcode();
      this.ip++;

      if (this.tib.length <= 0)
      {
        this.run = 0;
      }
    }

    document.getElementById('wait').style.display = "none";

    return this.tob;
  }

  this.getHeapPointer = function()
  {
    return image[3];
  }

  this.getDictPointer = function()
  {
    return image[2];
  }
}



/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 uki_start()

 Call this before using any Uki objects. It handles initializing the
 image for the first time.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
function uki_start()
{
  loadImage();
  var uki_core = new uki();
  uki_core.eval('');
}

