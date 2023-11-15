import { Buffer } from 'node:buffer';

enum SIZE {

	INT8 = 1,
	INT16 = 2,
	INT32 = 4,
	INT64 = 8,

	UINT8 = 1,
	UINT16 = 2,
	UINT32 = 4,
	UINT64 = 8,

}

export class ArkivBuffer {
  private pointer: number = 0;

  constructor(
    public buffer: Buffer = Buffer.from('')
  ) {}

  get length(): number {
    return this.buffer.length;
  }

  private checkBufferSize(size: SIZE) {
    if ( this.pointer + size >= this.buffer.length ) {
      const buf = Buffer.alloc(this.pointer + size);
      this.buffer.copy(buf, 0, 0, this.buffer.length);
      this.buffer = buf;
    }
  }

  readInt8() {
    const ret = this.buffer.readInt8(this.pointer);
    this.pointer += SIZE.INT8;
    return ret;
  }

  writeInt8(val: number) {
    this.checkBufferSize(SIZE.INT8);
    this.buffer.writeInt8(val, this.pointer);
    this.pointer += SIZE.INT8;
  }

  readInt16(isBigEndian: boolean = false) {
    let ret = 0;
    if ( isBigEndian ) {
      ret = this.buffer.readInt16BE(this.pointer);
    } else {
      ret = this.buffer.readInt16LE(this.pointer);
    }
    this.pointer += SIZE.INT16;
    return ret;
  }

  writeInt16(val: number, isBigEndian: boolean = false) {
    this.checkBufferSize(SIZE.INT16);
    if ( isBigEndian ) {
      this.buffer.writeInt16BE(val, this.pointer);
    } else {
      this.buffer.writeInt16LE(val, this.pointer);
    }
    this.pointer += SIZE.INT16;
  }

  readInt32(isBigEndian: boolean = false) {
    let ret = 0;
    if ( isBigEndian ) {
      ret = this.buffer.readInt32BE(this.pointer);
    } else {
      ret = this.buffer.readInt32LE(this.pointer);
    }
    this.pointer += SIZE.INT32;
    return ret;
  }

  writeInt32(val: number, isBigEndian: boolean = false) {
    this.checkBufferSize(SIZE.INT32);
    if ( isBigEndian ) {
      this.buffer.writeInt32BE(val, this.pointer);
    } else {
      this.buffer.writeInt32LE(val, this.pointer);
    }
    this.pointer += SIZE.INT32;
  }

  readInt64(isBigEndian: boolean = false) {
    let ret:bigint = BigInt(0);
    if ( isBigEndian ) {
      ret = this.buffer.readBigInt64BE(this.pointer);
    } else {
      ret = this.buffer.readBigInt64LE(this.pointer);
    }
    this.pointer += SIZE.INT64;
    return ret;
  }

  writeInt64(val: Parameters<typeof BigInt>[0], isBigEndian: boolean = false) {
    this.checkBufferSize(SIZE.INT64);
    const writeValue = BigInt(val);
    if ( isBigEndian ) {
      this.buffer.writeBigInt64BE(writeValue, this.pointer);
    } else {
      this.buffer.writeBigInt64LE(writeValue, this.pointer);
    }
    this.pointer += SIZE.INT64;
  }

  readUint8() {
    const ret = this.buffer.readUint8(this.pointer);
    this.pointer += SIZE.UINT8;
    return ret;
  }

  writeUint8(val: number) {
    this.checkBufferSize(SIZE.UINT8);
    this.buffer.writeUint8(val, this.pointer);
    this.pointer += SIZE.UINT8;
  }

  readUint16(isBigEndian: boolean = false) {
    let ret = 0;
    if ( isBigEndian ) {
      ret = this.buffer.readUint16BE(this.pointer);
    } else {
      ret = this.buffer.readUint16LE(this.pointer);
    }
    this.pointer += SIZE.UINT16;
    return ret;
  }

  writeUint16(val: number, isBigEndian: boolean = false) {
    this.checkBufferSize(SIZE.UINT16);
    if ( isBigEndian ) {
      this.buffer.writeUInt16BE(val, this.pointer);
    } else {
      this.buffer.writeUInt16LE(val, this.pointer);
    }
    this.pointer += SIZE.UINT16;
  }

  readUint32(isBigEndian: boolean = false) {
    let ret = 0;
    if ( isBigEndian ) {
      ret = this.buffer.readUInt32BE(this.pointer);
    } else {
      ret = this.buffer.readUInt32LE(this.pointer);
    }
    this.pointer += SIZE.UINT32;
    return ret;
  }

  writeUint32(val: number, isBigEndian: boolean = false) {
    this.checkBufferSize(SIZE.UINT32);
    if ( isBigEndian ) {
      this.buffer.writeUInt32BE(val, this.pointer);
    } else {
      this.buffer.writeUint32LE(val, this.pointer);
    }
    this.pointer += SIZE.UINT32;
  }

  readUint64(isBigEndian: boolean = false) {
    let ret:bigint = BigInt(0);
    if ( isBigEndian ) {
      ret = this.buffer.readBigUint64BE(this.pointer);
    } else {
      ret = this.buffer.readBigUint64LE(this.pointer);
    }
    this.pointer += SIZE.UINT64;
    return ret;
  }

  writeUint64(val: Parameters<typeof BigInt>[0], isBigEndian: boolean = false) {
    this.checkBufferSize(SIZE.UINT64);
    const writeValue = BigInt(val);
    if ( isBigEndian ) {
      this.buffer.writeBigUInt64BE(writeValue, this.pointer);
    } else {
      this.buffer.writeBigUInt64LE(writeValue, this.pointer);
    }
    this.pointer += SIZE.UINT64;
  }

  read(length: number) {
    const buf = this.buffer.subarray(this.pointer, this.pointer + length);
    this.pointer += length;
    return buf;
  }

  write(val: string | Buffer) {
    this.buffer.fill(val, this.pointer, this.pointer + val.length);
    this.pointer += val.length;
  }

  readToEnd(offset: number) {
    this.pointer = this.buffer.length;
    return this.buffer.subarray(offset, this.buffer.length);
  }

}